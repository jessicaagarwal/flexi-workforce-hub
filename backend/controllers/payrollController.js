const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');
const User = require('../models/User');
const generatePayslip = require('../utils/payslipGenerator');
const path = require('path');
const fs = require('fs');

// Get current payroll for employee
exports.getCurrentPayroll = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Get user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get employee data or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    // Find the most recent payroll for this employee
    let payrolls = await Payroll.find({ employee: employee._id })
      .sort({ payPeriodEnd: -1 })
      .limit(1);
    
    // If no payroll exists, create a default one
    if (payrolls.length === 0) {
      const currentDate = new Date();
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const basicSalary = employee.salary || 5000;
      const allowances = 500;
      const bonus = 200;
      const overtime = 100;
      const tax = 500;
      const insurance = 250;
      const netPay = basicSalary + allowances + bonus + overtime - tax - insurance;
      
      const newPayroll = new Payroll({
        employee: employee._id,
        payPeriodEnd: lastDayOfMonth,
        paymentDate: lastDayOfMonth,
        basicSalary,
        allowances,
        bonus,
        overtime,
        tax,
        insurance,
        netPay,
        status: 'Paid'
      });
      
      await newPayroll.save();
      payrolls = [newPayroll];
    }
    
    // Format the response
    const formattedPayrolls = payrolls.map(payroll => ({
      _id: payroll._id,
      payPeriodEnd: payroll.payPeriodEnd,
      paymentDate: payroll.paymentDate,
      basicSalary: payroll.basicSalary,
      allowances: payroll.allowances,
      bonus: payroll.bonus,
      overtime: payroll.overtime,
      tax: payroll.tax,
      insurance: payroll.insurance,
      netPay: payroll.netPay,
      status: payroll.status
    }));
    
    res.json(formattedPayrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payroll history for employee
exports.getPayrollHistory = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Get user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get employee data or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    // Find all payrolls for this employee, sorted by date
    let payrolls = await Payroll.find({ employee: employee._id })
      .sort({ payPeriodEnd: -1 });
    
    // If no payrolls exist, create some default ones
    if (payrolls.length === 0) {
      const currentDate = new Date();
      const payrolls = [];
      
      // Create payrolls for the last 3 months
      for (let i = 1; i <= 3; i++) {
        const month = currentDate.getMonth() - i;
        const year = currentDate.getFullYear() + Math.floor(month / 12);
        const adjustedMonth = ((month % 12) + 12) % 12; // Handle negative months
        
        const lastDayOfMonth = new Date(year, adjustedMonth + 1, 0);
        
        const basicSalary = 5000 - (i > 2 ? 200 : 0); // Slightly lower salary for older months
        const allowances = 500 - (i > 2 ? 20 : 0);
        const bonus = i === 1 ? 100 : (i === 2 ? 100 : 0); // No bonus for oldest month
        const overtime = i === 1 ? 50 : (i === 2 ? 50 : 0); // No overtime for oldest month
        const tax = basicSalary * 0.1;
        const insurance = basicSalary * 0.05;
        const netPay = basicSalary + allowances + bonus + overtime - tax - insurance;
        
        const newPayroll = new Payroll({
          employee: employee._id,
          payPeriodEnd: lastDayOfMonth,
          paymentDate: lastDayOfMonth,
          basicSalary,
          allowances,
          bonus,
          overtime,
          tax,
          insurance,
          netPay,
          status: 'Paid'
        });
        
        await newPayroll.save();
        payrolls.push(newPayroll);
      }
      
      // Re-fetch the payrolls to get them in the right order
      payrolls = await Payroll.find({ employee: employee._id })
        .sort({ payPeriodEnd: -1 });
    }
    
    // Format the response
    const formattedPayrolls = payrolls.map(payroll => ({
      _id: payroll._id,
      payPeriodEnd: payroll.payPeriodEnd,
      paymentDate: payroll.paymentDate,
      basicSalary: payroll.basicSalary,
      allowances: payroll.allowances,
      bonus: payroll.bonus,
      overtime: payroll.overtime,
      tax: payroll.tax,
      insurance: payroll.insurance,
      netPay: payroll.netPay,
      status: payroll.status
    }));
    
    res.json(formattedPayrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

// Download payslip
exports.downloadPayslip = async (req, res) => {
  try {
    const payslipId = req.params.id;
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Get employee data for the payslip
    let employeeData = {
      name: "Employee",
      position: "Staff",
      department: "General"
    };
    
    try {
      // Try to get actual employee data if available
      const payroll = await Payroll.findById(payslipId);
      if (payroll && payroll.employee) {
        const employee = await Employee.findById(payroll.employee);
        if (employee) {
          employeeData = {
            name: employee.name || "Employee",
            position: employee.position || "Staff",
            department: employee.department || "General"
          };
        }
      }
    } catch (err) {
      console.log("Using default employee data for payslip");
    }
    
    // Create a PDF file using pdfkit
    const PDFDocument = require('pdfkit');
    const payslipPath = path.join(uploadsDir, `payslip-${payslipId}.pdf`);
    const doc = new PDFDocument({ margin: 50 });
    
    // Pipe the PDF to a file
    const writeStream = fs.createWriteStream(payslipPath);
    doc.pipe(writeStream);
    
    // Add company header
    doc.fontSize(20).text('HRX COMPANY', { align: 'center' });
    doc.fontSize(16).text(`PAYSLIP #${payslipId}`, { align: 'center' });
    doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(2);
    
    // Add employee information
    doc.fontSize(14).text('Employee Information', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Name: ${employeeData.name}`);
    doc.text(`Position: ${employeeData.position}`);
    doc.text(`Department: ${employeeData.department}`);
    doc.moveDown(1);
    
    // Add earnings section
    doc.fontSize(14).text('Earnings', { underline: true });
    doc.moveDown(0.5);
    
    // Helper function to add a row with two columns
    const addRow = (label, value) => {
      doc.text(label, { continued: true, width: 300 });
      doc.text(value, { align: 'right' });
    };
    
    addRow('Basic Salary:', '$5,000.00');
    addRow('Allowances:', '$500.00');
    addRow('Bonus:', '$200.00');
    addRow('Overtime:', '$100.00');
    
    // Add a line
    doc.moveDown(0.5);
    doc.moveTo(50, doc.y)
       .lineTo(550, doc.y)
       .stroke();
    doc.moveDown(0.5);
    
    // Total earnings
    addRow('Total Earnings:', '$5,800.00');
    doc.moveDown(1);
    
    // Add deductions section
    doc.fontSize(14).text('Deductions', { underline: true });
    doc.moveDown(0.5);
    
    addRow('Tax:', '$500.00');
    addRow('Insurance:', '$250.00');
    
    // Add a line
    doc.moveDown(0.5);
    doc.moveTo(50, doc.y)
       .lineTo(550, doc.y)
       .stroke();
    doc.moveDown(0.5);
    
    // Total deductions
    addRow('Total Deductions:', '$750.00');
    doc.moveDown(1);
    
    // Net pay
    doc.fontSize(14).text('Net Pay', { underline: true });
    doc.moveDown(0.5);
    
    // Add a line
    doc.moveTo(50, doc.y)
       .lineTo(550, doc.y)
       .stroke();
    doc.moveDown(0.5);
    
    // Net salary in bold
    doc.font('Helvetica-Bold');
    addRow('Net Salary:', '$5,050.00');
    doc.font('Helvetica');
    doc.moveDown(2);
    
    // Footer
    doc.fontSize(10).text('This is a sample payslip for demonstration purposes.', { align: 'center', italic: true });
    
    // Finalize the PDF
    doc.end();
    
    // Wait for the PDF to be created
    writeStream.on('finish', () => {
      // Set headers for PDF content
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="payslip-${payslipId}.pdf"`);
      
      // Send the file
      const fileStream = fs.createReadStream(payslipPath);
      fileStream.pipe(res);
      
      // Clean up the file after sending
      fileStream.on('end', () => {
        fs.unlinkSync(payslipPath);
      });
    });
    
  } catch (error) {
    console.error('Error downloading payslip:', error);
    res.status(500).json({ message: 'Failed to download payslip' });
  }
};