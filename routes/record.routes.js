const express = require('express');
const router = express.Router();
const recordController = require('../controllers/record.controller');
const { validateRecords, validateSingleUser } = require('../middleware/record.validator');
const { validationResult } = require('express-validator');

// Middleware to handle validation errors
const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Bulk insert records
router.post('/bulk', recordController.bulkInsert);

// Get all records
router.get('/list', recordController.getAllRecords);

// Update a specific record by ID
router.put('/update/:id', validateSingleUser, runValidation, recordController.updateOne);

// Search records
router.post('/search', recordController.search);

// Get count of active users
router.get('/getActiveUser', recordController.countActiveUser);

// Register a new user
router.post('/signup', validateSingleUser, recordController.signup);

// Contact form submission
router.post('/contactMe', recordController.contactMe);

module.exports = router;
