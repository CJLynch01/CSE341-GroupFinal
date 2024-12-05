require('dotenv').config();
const { requiresAuth } = require('express-openid-connect');

const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', requiresAuth(), swaggerUi.setup(swaggerDocument));

module.exports = router;