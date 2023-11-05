const express = require('express');
var cors = require('cors')
const router = express.Router();
const usageController = require('../controllers/UsageController');

var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}

router.get('/api/v1/:meterId/:start/:end', cors(corsOptions),usageController.getUsageData);

module.exports = router;
