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
 *                 email:
 *                   type: string
 *     responses:
 *       201:
 *         description: Records inserted successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post('/bulk', recordController.bulkInsert);

/**
 * @swagger
 * /records/list:
 *   get:
 *     summary: Get all records
 *     responses:
 *       200:
 *         description: List of all records
 */
router.get('/list', recordController.getAllRecords);

/**
 * @swagger
 * /records/update/{id}:
 *   put:
 *     summary: Update a record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: record
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Record updated successfully
 */
router.put('/update/:id', validateSingleUser, runValidation, recordController.updateOne);

/**
 * @swagger
 * /records/search:
 *   post:
 *     summary: Search records
 *     responses:
 *       200:
 *         description: Search results
 */
router.post('/search', recordController.search);

/**
 * @swagger
 * /records/getActiveUser:
 *   get:
 *     summary: Get count of active users
 *     responses:
 *       200:
 *         description: Number of active users
 */
router.get('/getActiveUser', recordController.countActiveUser);

/**
 * @swagger
 * /records/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */
router.post('/signup', validateSingleUser, recordController.signup);

/**
 * @swagger
 * /records/contactMe:
 *   post:
 *     summary: Contact form submission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message submitted
 */
router.post('/contactMe', recordController.contactMe);

module.exports = router;
