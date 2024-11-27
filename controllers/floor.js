const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('floor').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const floorId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('floor').find({ _id: floorId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewFloor = async (req, res) => {
  const floor = {
    floorNum: req.body.floorNum,
    permission: req.body.permission
  };
  const response = await mongodb.getDb().db().collection('floor').insertOne(floor);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the floor.');
  }
};

const editFloor = async (req, res) => {
  const floorId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const floor = {
    floorNum: req.body.floorNum,
    permission: req.body.permission
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('floor')
    .replaceOne({ _id: floorId }, floor);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the floor.');
  }
};

const deleteFloor = async (req, res) => {
  const floorId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('floor').deleteOne({ _id: floorId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the floor.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createNewFloor,
  editFloor,
  deleteFloor
};