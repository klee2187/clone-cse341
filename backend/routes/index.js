const routes = require('express').Router();

const baseController = require('../controllers');

const userController = require('../controllers/user');
const contactsRoutes = require('./contacts');
const practiceRoutes = require('./practice');
const templeRoutes = require('./temple');

routes.get('/', baseController.getName);
routes.get('/professional', userController.getProfessional);

routes.use('/contacts', contactsRoutes);
routes.use('/practice', practiceRoutes);
routes.use('/temples', templeRoutes);

routes.get('/', (req, res) => {
  res.send({
    documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs'
  });
});

module.exports = routes;
