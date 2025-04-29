const Employee = require('../models/Employee');
const User = require('../models/User');

// Get employee by user ID
exports.getEmployeeByUserId = async (req, res) => {
  try {
    const employee = await Employee.findOne({ createdBy: req.params.userId });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new employee
exports.addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single employee
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete employee (soft delete)
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    res.json({ message: 'Employee archived', employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create employee with credentials
exports.createEmployeeWithCredentials = async (req, res) => {
  try {
    const { name, email, password, ...otherFields } = req.body;
    // Check if user/email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    // 1. Create User for login
    const user = new User({ name, email, password, role: 'employee' });
    await user.save();
    // 2. Create Employee profile
    // Generate a unique employeeId if not provided
    let employeeId = otherFields.employeeId;
    if (!employeeId) {
      employeeId = 'EMP' + Date.now();
    }
    const employee = new Employee({
      name,
      email,
      employeeId,
      createdBy: req.user._id, // HR's user ID from JWT/session
      user: user._id, // optional: link User and Employee
      ...otherFields
    });
    try {
      await employee.save();
      res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (employeeError) {
      // If Employee creation fails, delete the created User
      await User.findByIdAndDelete(user._id);
      throw employeeError;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employees for HR
exports.getEmployeesForHR = async (req, res) => {
  try {
    const employees = await Employee.find({ createdBy: req.user._id });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
