const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  department: { type: String },
  jobRole: { type: String },
  salary: { type: Number },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    bankName: String,
  },
  isActive: { type: Boolean, default: true },
  employmentHistory: [
    {
      role: String,
      department: String,
      from: Date,
      to: Date,
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
