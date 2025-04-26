const express = require('express');
const { uploadDocument, getEmployeeDocuments, downloadDocument } = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadDocument);
router.get('/employee/:id', protect, getEmployeeDocuments);
router.get('/download/:filename', protect, downloadDocument);

module.exports = router;
