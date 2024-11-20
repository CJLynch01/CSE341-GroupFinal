const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('class').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const classId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('class').find({ _id: classId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewClass = async (req, res) => {
  const classDetails = {
    className: req.body.className,
    recipes: req.body.recipes
  };
  const response = await mongodb.getDb().db().collection('class').insertOne(classDetails);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the class.');
  }
};

const editClass = async (req, res) => {
  const classId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const classDetails = {
    className: req.body.className,
    recipes: req.body.recipes
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('class')
    .replaceOne({ _id: classId }, classDetails);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the class.');
  }
};

const deleteClass = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('class').remove({ _id: classId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the class.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createNewClass,
  editClass,
  deleteClass
};