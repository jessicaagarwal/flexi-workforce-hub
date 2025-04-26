const express = require('express');
const {
  applyLeave,
  getAllLeaves,
  getMyLeaves,
  updateLeaveStatus
} = require('../controllers/leaveController');

const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Leave application & personal view
router.route('/').post(protect, applyLeave).get(protect, getAllLeaves);
router.route('/my').get(protect, getMyLeaves);

// Update leave status
router.route('/:id').put(protect, updateLeaveStatus);

module.exports = router;
