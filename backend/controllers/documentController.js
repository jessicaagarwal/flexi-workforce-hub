const Document = require('../models/Document');
const Employee = require('../models/Employee');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

exports.uploadDocument = async (req, res) => {
  const { title } = req.body;
  try {
    // Get user data
    const userId = req.user._id;
    
    // Get employee data or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Get user data
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Handle multiple files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    // Create document records for each file
    const documents = [];
    for (const file of req.files) {
      const fileUrl = `/uploads/${file.filename}`;
      const doc = await Document.create({
        title: title || file.originalname,
        employee: employee._id,
        fileUrl,
        uploadedBy: userId
      });
      documents.push(doc);
    }
    
    res.status(201).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeDocuments = async (req, res) => {
  try {
    // Get user data
    const userId = req.user._id;
    
    // Get employee data or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Get user data
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    const documents = await Document.find({ employee: req.params.id }).populate('uploadedBy');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeePersonalDocuments = async (req, res) => {
  try {
    // Get user data
    const userId = req.user._id;
    
    // Get employee data or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Get user data
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    // In a real app, you would filter by document type or category
    // For now, we'll return all employee documents as personal documents
    const documents = await Document.find({ employee: req.params.id }).populate('uploadedBy');
    
    // Format the response to match what the frontend expects
    const formattedDocs = documents.map(doc => ({
      _id: doc._id,
      name: doc.title,
      uploadedBy: doc.uploadedBy ? doc.uploadedBy.name : 'System',
      uploadDate: doc.createdAt,
      size: 1024 * 1024 // Mock file size of 1MB
    }));
    
    res.json(formattedDocs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeePayrollDocuments = async (req, res) => {
  try {
    // Get user data
    const userId = req.user._id;
    
    // Get employee data or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Get user data
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    // In a real app, you would filter by document type or category
    // For now, we'll return a mock response for payroll documents
    const documents = await Document.find({ employee: req.params.id }).populate('uploadedBy');
    
    // Format the response to match what the frontend expects
    const formattedDocs = documents.map(doc => ({
      _id: doc._id,
      name: doc.title.includes('Payslip') ? doc.title : `Payslip - ${new Date(doc.createdAt).toLocaleDateString()}`,
      uploadedBy: 'Payroll System',
      uploadDate: doc.createdAt,
      size: 512 * 1024 // Mock file size of 512KB
    }));
    
    res.json(formattedDocs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyDocuments = async (req, res) => {
  try {
    // Get user data
    const userId = req.user._id;
    
    // Get employee data or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Get user data
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    // In a real app, you would filter by document type or category
    // For now, we'll return a mock response for company documents
    const documents = await Document.find({}).populate('uploadedBy').limit(5);
    
    // Format the response to match what the frontend expects
    const formattedDocs = documents.map(doc => ({
      _id: doc._id,
      name: doc.title.includes('Company') ? doc.title : `Company Policy - ${doc.title}`,
      uploadedBy: doc.uploadedBy ? doc.uploadedBy.name : 'HR Department',
      uploadDate: doc.createdAt,
      size: 2 * 1024 * 1024 // Mock file size of 2MB
    }));
    
    res.json(formattedDocs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewDocument = async (req, res) => {
  try {
    // Get user data
    const userId = req.user._id;
    
    // Get employee data or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Get user data
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    // In a real app, you would stream the file or generate a signed URL
    // For now, we'll just return the file URL
    res.json({ fileUrl: document.fileUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadDocument = async (req, res) => {
  try {
    // Get user data
    const userId = req.user._id;
    
    // Get employee data or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Get user data
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    // Get the filename from the fileUrl
    const filename = document.fileUrl.split('/').pop();
    
    // Create the absolute path to the file
    const filePath = path.join(__dirname, '../uploads', filename);
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }
    
    // Send the file
    res.download(filePath, document.title || filename);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
