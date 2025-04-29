const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Attendance = require('../models/Attendence');
const Employee = require('../models/Employee');

async function fixAttendanceEmployeeLinks() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/flexi-workforce-hub');

  const attendances = await Attendance.find();
  let fixed = 0;
  let notFixed = [];

  for (const att of attendances) {
    // If already linked to a valid employee, skip
    const emp = await Employee.findById(att.employee);
    if (emp) {
      continue;
    }
    // Try to match by user or createdBy
    let foundEmp = await Employee.findOne({ user: att.employee });
    if (!foundEmp) {
      foundEmp = await Employee.findOne({ createdBy: att.employee });
    }
    if (foundEmp) {
      att.employee = foundEmp._id;
      await att.save();
      fixed++;
      console.log(`Fixed attendance (${att._id}) to employee ${foundEmp.name}`);
      continue;
    }
    notFixed.push(att._id);
    console.warn(`Could not fix attendance (${att._id}) - no matching employee found`);
  }

  console.log(`Done! Fixed ${fixed} attendance records.`);
  if (notFixed.length > 0) {
    console.log('Attendance records not fixed:', notFixed);
  }
  mongoose.disconnect();
}

fixAttendanceEmployeeLinks(); 