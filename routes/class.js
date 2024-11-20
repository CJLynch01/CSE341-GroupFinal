const express = require('express');
const router = express.Router();

const classController = require('../controllers/class');
const validation = require('../middleware/validate');

router.get('/', classController.getAll);

router.get('/:id', classController.getSingle);

router.post('/', validation.saveClass, classController.createNewClass);

router.put('/:id', validation.saveClass, classController.editClass);

router.delete('/:id', classController.deleteClass);

module.exports = router;