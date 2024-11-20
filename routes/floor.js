const express = require('express');
const router = express.Router();

const floorController = require('../controllers/floor');
const validation = require('../middleware/validate');

router.get('/', floorController.getAll);

router.get('/:id', floorController.getSingle);

router.post('/', validation.saveFloor, floorController.createNewFloor);

router.put('/:id', validation.saveFloor, floorController.editFloor);

router.delete('/:id', classController.deleteFloor);

module.exports = router;