const { body } = require('express-validator');

exports.validateRecords = [
    body().isArray({ min: 1 }).withMessage("Input must be a non-empty array"),

    body('*.name').notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string"),
    body('*.email').notEmpty().withMessage("Email is required").isEmail().withMessage("Email must be valid"),
    body('*.phone').notEmpty().withMessage("Phone is required")
        .isLength({ min: 10 }).withMessage("Phone must be at least 10 digits")
        .matches(/^[0-9]+$/).withMessage("Phone must be numeric"),

    body('*.password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];


exports.validateSingleUser = [
    body('name')
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string"),

    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email must be valid"),

    body('phone')
        .notEmpty().withMessage("Phone is required")
        .isLength({ min: 10 }).withMessage("Phone must be at least 10 digits")
        .matches(/^[0-9]+$/).withMessage("Phone must be numeric"),

    body('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

