const express = require('express');
const {
  generatePayroll,
  getAllPayrolls,
  getEmployeePayroll,
  markAsPaid
} = require('../controllers/payrollController');

const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, generatePayroll).get(protect, getAllPayrolls);
router.route('/:id').get(protect, getEmployeePayroll).put(protect, markAsPaid);

module.exports = router;
