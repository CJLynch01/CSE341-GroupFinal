const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student');
const validation = require('../middleware/validate');

router.get('/', studentController.getAll);

router.get('/:id', studentController.getSingle);

router.post('/', studentController.createNewStudent);

router.put('/:id', studentController.editStudent);

router.delete('/:id', studentController.deleteStudent);

module.exports = router;