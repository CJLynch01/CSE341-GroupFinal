const mongodb = require('../db/connect');
const { getRandomHouse } = require('./house');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('student').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('student').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewStudent = async (req, res) => {
  try {
    const randomHouse = await getRandomHouse();
    console.log('Random House:', randomHouse); // Debugging log

    if (!randomHouse || !randomHouse.name) {
      return res.status(400).json({ error: 'No valid house available for assignment.' });
    }

    const student = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      year: parseInt(req.body.year, 10),
      house: randomHouse.name, // Assign house name
      birthday: req.body.birthday,
      userId: req.body.userId
    };

    console.log('Student Object Before Insert:', student); // Debugging log

    const response = await mongodb.getDb().db().collection('student').insertOne(student);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Student created successfully',
        studentID: response.insertedId,
        assignedHouse: randomHouse.name
      });
    } else {
      throw new Error('Failed to register.');
    }
  } catch (error) {
    console.error('Error in createNewStudent:', error.message); // Debugging log
    res.status(500).json({ error: error.message });
  }
};

const editStudent = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const user = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    year: req.body.year,
    house: req.body.house,
    birthday: req.body.birthday,
    userId: req.body.userId
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('student')
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteStudent = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('student').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createNewStudent,
  editStudent,
  deleteStudent
};