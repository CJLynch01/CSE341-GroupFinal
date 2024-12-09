const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all houses
const getAll = async (req, res) => {
  try {
    const houses = await mongodb.getDb().db().collection('house').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(houses);
  } catch (error) {
    console.error('Error fetching all houses:', error.message);
    res.status(500).json({ error: 'Failed to retrieve houses' });
  }
};

// Get a single house by ID
const getSingle = async (req, res) => {
  try {
    const houseId = new ObjectId(req.params.id);
    const house = await mongodb.getDb().db().collection('house').findOne({ _id: houseId });

    if (!house) {
      return res.status(404).json({ error: 'House not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(house);
  } catch (error) {
    console.error('Error fetching house:', error.message);
    res.status(500).json({ error: 'Failed to retrieve the house' });
  }
};

// Create a new house
const createNewHouse = async (req, res) => {
  try {
    const { house, location, information, password } = req.body;

    if (!house || !location || !information) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newHouse = { house, location, information, password };
    const response = await mongodb.getDb().db().collection('house').insertOne(newHouse);

    if (response.acknowledged) {
      res.status(201).json({ message: 'House created successfully', id: response.insertedId });
    } else {
      throw new Error('Failed to create the house');
    }
  } catch (error) {
    console.error('Error creating new house:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Edit an existing house
const editHouse = async (req, res) => {
  try {
    const houseId = new ObjectId(req.params.id);
    const { house, location, information, password } = req.body;

    const updateFields = { ...(house && { house }), ...(location && { location }), ...(information && { information }), ...(password && { password }) };

    const response = await mongodb.getDb().db().collection('house').updateOne({ _id: houseId }, { $set: updateFields });

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'House updated successfully' });
    } else {
      res.status(404).json({ error: 'House not found or no changes made' });
    }
  } catch (error) {
    console.error('Error editing house:', error.message);
    res.status(500).json({ error: 'Failed to update the house' });
  }
};

// Delete a house by ID
const deleteHouse = async (req, res) => {
  try {
    const houseId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('house').deleteOne({ _id: houseId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'House deleted successfully' });
    } else {
      res.status(404).json({ error: 'House not found' });
    }
  } catch (error) {
    console.error('Error deleting house:', error.message);
    res.status(500).json({ error: 'Failed to delete the house' });
  }
};

// Get a random house
const getRandomHouse = async () => {
  try {
    const houses = await mongodb.getDb().db().collection('house').find().toArray();

    if (!houses || houses.length === 0) {
      throw new Error('No houses available for assignment');
    }

    const randomIndex = Math.floor(Math.random() * houses.length);
    const selectedHouse = houses[randomIndex];

    return selectedHouse;
  } catch (error) {
    console.error('Error in getRandomHouse:', error.message);
    throw error;
  }
};

module.exports = {
  getAll,
  getSingle,
  createNewHouse,
  editHouse,
  deleteHouse,
  getRandomHouse
};
