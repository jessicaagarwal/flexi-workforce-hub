const express = require('express');
const {
  addReview,
  getAllReviews,
  getEmployeeReviews,
  getEmployeePerformance,
  getEmployeeSkills,
  getEmployeeGoals,
  getEmployeeFeedback
} = require('../controllers/performanceController');

const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addReview);
router.get('/', protect, getAllReviews);
router.get('/employee/:id', protect, getEmployeePerformance);
router.get('/employee/:id/skills', protect, getEmployeeSkills);
router.get('/employee/:id/goals', protect, getEmployeeGoals);
router.get('/employee/:id/feedback', protect, getEmployeeFeedback);
router.get('/employee/:id/reviews', protect, getEmployeeReviews);

module.exports = router;
