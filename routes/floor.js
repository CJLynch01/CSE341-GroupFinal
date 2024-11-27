const express = require('express');
const router = express.Router();

const floorController = require('../controllers/floor');
const validation = require('../middleware/validate');

router.get('/', floorController.getAll);

router.get('/:id', floorController.getSingle);

router.post('/', floorController.createNewFloor);

router.put('/:id', floorController.editFloor);

router.delete('/:id', floorController.deleteFloor);

module.exports = router;