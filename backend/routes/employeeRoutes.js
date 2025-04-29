const express = require('express');
const { 
  addEmployee, 
  getEmployees, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee,
  getEmployeeByUserId,
  getAllEmployees,
  createEmployee,
  createEmployeeWithCredentials
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getEmployees).post(protect, addEmployee);
router.route('/user/:userId').get(protect, getEmployeeByUserId);
router.route('/:id').get(protect, getEmployeeById).put(protect, updateEmployee).delete(protect, deleteEmployee);
router.post('/create-with-credentials', protect, createEmployeeWithCredentials);

module.exports = router;
