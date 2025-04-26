const express = require('express');
const {
  addReview,
  getAllReviews,
  getEmployeeReviews
} = require('../controllers/performanceController');

const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addReview);
router.get('/', protect, getAllReviews);
router.get('/:id', protect, getEmployeeReviews);

module.exports = router;
