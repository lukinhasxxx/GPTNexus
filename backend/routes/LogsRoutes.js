const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/LogsController');

router.get('/logs', getLogs);

module.exports = router;
