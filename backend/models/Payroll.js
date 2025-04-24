const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  salaryMonth: {
    type: String, // Format: "YYYY-MM"
    required: true
  },
  baseSalary: { type: Number, required: true },
  deductions: {
    tax: { type: Number, default: 0 },
    pf: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  netSalary: { type: Number },
  status: {
    type: String,
    enum: ['Generated', 'Paid'],
    default: 'Generated'
  },
  payslipUrl: { type: String }, // Optional: attach PDF or external link

}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);
