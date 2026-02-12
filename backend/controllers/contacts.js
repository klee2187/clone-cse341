const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Added Error Handling(Different style from the one used below)
const getAll = async (req, res) => {
  try {
    //Validate database connection
    const db = mongodb.getDb();
    if (!db) {
      return res.status(500).json({ message: 'Database connection not initialized' });
    }
    const result = await db
      .db()
      .collection('contacts')
      .find();
 
    const lists = await result.toArray();
 
    res.setHeader('Content-Type', 'application/json');
 
    //If/else to check if contacts exist
    if(lists.length > 0) {
      res.status(200).json(lists);
    } else {
      res.status(200).json({ message: 'No contacts found', data: [] });
    }
  } catch (err) {
    res.status(400).json({ message: err.toString() });
  }
};

const getSingle = async (req, res, next) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('A valid contact id is needed to find a contact.');
    }
        const userId = new ObjectId(req.params.id);
        mongodb.getDb().collection('contacts').find({ _id: userId });
        result.toArray().then((lists) => {
            if(err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);});
};  

const addContact = async (req, res) => {
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const result = await 
    mongodb.getDb().collection('contacts').insertOne(newContact);
    if (result.acknowledge) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'An error ocurred while creating the contact.');
    }

};

const updateContact = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Valid contact id required to update contact.');
    }

    const userId = new ObjectId(req.params.id);

    const updatedData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const result = await mongodb.getDb().collection('contacts').updateOne({ _id: userId }, { $set: updatedData });

    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error ocurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Valid contact id required to delete a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json (result.error || 'An error occureed while deleting the contact');
    }
};

module.exports = { getAll, getSingle, addContact, updateContact, deleteContact };