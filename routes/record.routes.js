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

// Route to bulk insert records
/**
 * @swagger
 * /records/bulk:
 *   post:
 *     summary: Bulk insert records
 *     description: Bulk insert multiple records at once.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *     responses:
 *       201:
 *         description: Records inserted successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post('/bulk', recordController.bulkInsert);

// Route to get all records
/**
 * @swagger
 * /records/list:
 *   get:
 *     summary: Get all records
 *     description: Fetch all records from the database.
 *     responses:
 *       200:
 *         description: List of all records
 *       500:
 *         description: Server error
 */
router.get('/list', recordController.getAllRecords);

// Route to update a specific record by ID
/**
 * @swagger
 * /records/update/{id}:
 *   put:
 *     summary: Update a record by ID
 *     description: Update a specific record based on the ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the record to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: record
 *         required: true
 *         description: The record data to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe"
 *             email:
 *               type: string
 *               example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: Record updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Record not found
 *       500:
 *         description: Server error
 */
router.put('/update/:id', validateSingleUser, runValidation, recordController.updateOne);

router.post('/search', recordController.search)
router.get('/getActiveUser', recordController.countActiveUser)




router.post('/signup', validateSingleUser, recordController.signup)


router.post('/contactMe', recordController.contactMe)
module.exports = router;
