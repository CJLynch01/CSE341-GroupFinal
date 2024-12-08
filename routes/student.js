const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student');
const {saveStudent} = require('../middleware/validate');

router.get('/', studentController.getAll);

router.get('/:id', studentController.getSingle);

router.post('/', saveStudent, studentController.createNewStudent);

router.put('/:id', studentController.editStudent);

router.delete('/:id', studentController.deleteStudent);

module.exports = router;