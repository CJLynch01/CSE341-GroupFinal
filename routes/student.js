const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate')
const studentController = require('../controllers/student');

router.get('/', studentController.getAll);

router.get('/:id', studentController.getSingle);

router.post('/', validation.saveStudent, studentController.createNewStudent);

router.put('/:id', studentController.editStudent);

router.delete('/:id', studentController.deleteStudent);

module.exports = router;