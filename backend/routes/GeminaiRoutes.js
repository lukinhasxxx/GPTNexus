const express = require('express');
const router = express.Router();
const { consultarGeminai } = require('../controllers/GeminaiController');

router.post('/consultar', consultarGeminai);

module.exports = router;
