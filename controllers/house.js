const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Avoids confusing with getAll -- reusable function for randomizer
const fetchAllHouses = async () => {
  return await mongodb.getDb().db().collection('house').find().toArray();
};

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('house').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const houseId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('house').find({ _id: houseId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewHouse = async (req, res) => {
  const house = {
    location: req.body.location,
    information: req.body.information,
    password: req.body.password
  };
  const response = await mongodb.getDb().db().collection('house').insertOne(house);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the house.');
  }
};

const editHouse = async (req, res) => {
  const houseId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const house = {
    location: req.body.location,
    information: req.body.information,
    password: req.body.password
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('house')
    .replaceOne({ _id: houseId }, house);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the house.');
  }
};

// Get a random house
const getRandomHouse = async () => {
  const houses = await fetchAllHouses();
  if (!houses || houses.length === 0) {
    throw new Error('No houses available for assignment.');
  }
  const randomIndex = Math.floor(Math.random() * houses.length);
  return houses[randomIndex];
};


module.exports = {
  getAll,
  getSingle,
  createNewHouse,
  editHouse,
  getRandomHouse
};