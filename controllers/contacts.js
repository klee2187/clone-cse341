const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll =async (req, res, next) => {
    const result = await mongodb.getDb().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').find({ _id: userId });

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
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

    res.status(201).json(result);
    
};

const updateContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const updatedData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const result = await mongodb.getDb().collection('contacts').updateOne({ _id: userId }, { $set: updatedData });

    res.status(204).send();
}

const deleteContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: userId });

    res.status(204).send();
}

module.exports = { getAll, getSingle, addContact, updateContact, deleteContact };