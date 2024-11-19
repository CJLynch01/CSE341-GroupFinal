const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
// router.use('/student', require('./student'));
// router.use('/house', require('./house'));
// router.use('/classes', require('./classes'));
// router.use('/floor', require('./floor'));

module.exports = router;