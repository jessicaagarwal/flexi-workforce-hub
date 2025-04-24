const Document = require('../models/Document');

exports.uploadDocument = async (req, res) => {
  const { title, employeeId } = req.body;
  try {
    const fileUrl = `/uploads/${req.file.filename}`;
    const doc = await Document.create({
      title,
      employee: employeeId,
      fileUrl,
      uploadedBy: req.user._id
    });
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ employee: req.params.id }).populate('uploadedBy');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadDocument = async (req, res) => {
  const filePath = `uploads/${req.params.filename}`;
  res.download(filePath);
};
