const Leave = require('../models/Leave');

// Apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create({
      ...req.body,
      requestedBy: req.user._id
    });
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all leave requests (Admin/HR)
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('employee')
      .populate('requestedBy')
      .populate('reviewedBy');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get personal leave history (Employee)
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ requestedBy: req.user._id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve/Reject leave (HR/Admin only)
exports.updateLeaveStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status, reviewedBy: req.user._id },
      { new: true }
    );
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
