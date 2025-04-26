const Performance = require('../models/Performance');

// Add performance review
exports.addReview = async (req, res) => {
  try {
    const review = await Performance.create({
      ...req.body,
      reviewer: req.user._id
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Performance.find()
      .populate('employee')
      .populate('reviewer');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews by employee
exports.getEmployeeReviews = async (req, res) => {
  try {
    const reviews = await Performance.find({ employee: req.params.id })
      .populate('reviewer');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
