const express = require('express');
const router = express.Router();

const { getDashboardResumo } = require('../controllers/dashboardController');

router.get('/', getDashboardResumo);

module.exports = router;