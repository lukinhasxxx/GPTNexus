const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloController');

router.get('/hello-world', helloController.getHelloWorld);

module.exports = router;
