const express = require('express');
const router = express.Router();
const usageController = require('../controllers/UsageController');


router.get('/api/v1/:meterId/:start/:end', usageController.getUsageData);

module.exports = router;
