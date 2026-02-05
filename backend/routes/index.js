const routes = require('express').Router();

const userController = require('../controllers/user');
const contactsRoutes = require('./contacts');
const practiceRoutes = require('./practice');
const templeRoutes = require('./temple');
const swaggerRoutes = require('./swagger');

routes.get('/professional', userController.getProfessional);

routes.use('/contacts', contactsRoutes);
routes.use('/practice', practiceRoutes);
routes.use('/temples', templeRoutes);
routes.use('/', swaggerRoutes);

routes.get('/', (req, res) => {
  res.send({
    documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs'
  });
});

module.exports = routes;
