const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Employee = require('../models/Employee');
const User = require('../models/User');

async function linkEmployeesToUsers() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/flexi-workforce-hub');

  const employees = await Employee.find();
  let updated = 0;
  let notLinked = [];

  for (const emp of employees) {
    let changed = false;
    const user = await User.findOne({ email: emp.email });
    if (user) {
      if (!emp.user || emp.user.toString() !== user._id.toString()) {
        emp.user = user._id;
        changed = true;
        console.log(`Linked employee ${emp.name} to user ${user.email}`);
      }
    } else {
      notLinked.push(emp.email);
      console.warn(`No user found for employee ${emp.name} (${emp.email})`);
    }
    if (!emp.employeeId) {
      emp.employeeId = 'EMP' + Date.now() + Math.floor(Math.random() * 1000);
      changed = true;
      console.log(`Generated employeeId for ${emp.name}: ${emp.employeeId}`);
    }
    if (changed) {
      await emp.save();
      updated++;
    }
  }

  console.log(`Done! Linked ${updated} employees and ensured all have employeeId.`);
  if (notLinked.length > 0) {
    console.log('Employees not linked (no matching user found):', notLinked);
  }
  mongoose.disconnect();
}

linkEmployeesToUsers();