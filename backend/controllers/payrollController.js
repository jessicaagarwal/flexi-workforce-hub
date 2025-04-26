const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');
const generatePayslip = require('../utils/payslipGenerator');
const path = require('path');

// Generate Payroll
exports.generatePayroll = async (req, res) => {
  const { employeeId, salaryMonth, deductions } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const base = employee.salary;
    const totalDeductions = Object.values(deductions).reduce((acc, curr) => acc + curr, 0);
    const net = base - totalDeductions;

    const payroll = await Payroll.create({
      employee: employee._id,
      salaryMonth,
      baseSalary: base,
      deductions,
      netSalary: net,
    });

    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all payrolls (HR/Admin)
exports.getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate('employee');
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View employee payroll history
exports.getEmployeePayroll = async (req, res) => {
  try {
    const payrolls = await Payroll.find({ employee: req.params.id });
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update status to Paid
exports.markAsPaid = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndUpdate(req.params.id, { status: 'Paid' }, { new: true });
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.generatePayroll = async (req, res) => {
  const { employeeId, salaryMonth, deductions } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const base = employee.salary;
    const totalDeductions = Object.values(deductions).reduce((acc, curr) => acc + curr, 0);
    const net = base - totalDeductions;

    const payroll = await Payroll.create({
      employee: employee._id,
      salaryMonth,
      baseSalary: base,
      deductions,
      netSalary: net,
    });

    const pdfPath = await generatePayslip(employee, payroll);
    payroll.payslipUrl = `/uploads/${pdfPath.split('/uploads/')[1]}`;
    await payroll.save();

    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
