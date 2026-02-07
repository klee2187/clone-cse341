const routes = require('express').Router();

const professionalController = require('../controllers/professional');
const contacts = require('./contacts');
const temple = require('./temple');

routes.get('/', professionalController.getData);
routes.use('/contacts', contacts);

routes.use('/', require('./swagger'));
routes.use('/temple', temple);

routes.use('/', (docData = (req, res) => {
  let docData = {
    documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs'
  };
  res.send(docData);
  })
);

module.exports = routes;
