const express = require('express');
const router = express.Router();
const recordController = require('../controllers/record.controller');

router.post('/contactMe', recordController.contactMe);

module.exports = router;
