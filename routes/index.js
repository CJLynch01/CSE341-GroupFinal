const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/student', require('./student'));
router.use('/house', require('./house'));
router.use('/class', require('./class'));
router.use('/floor', require('./floor'));

module.exports = router;