const express = require('express');
const router = express.Router();

const houseController = require('../controllers/house');

router.get('/', houseController.getAll);

router.get('/:id', houseController.getSingle);

router.post('/', houseController.createNewHouse);

router.put('/house/:id', houseController.editHouse);

router.delete('/:id', houseController.deleteHouse);

module.exports = router;