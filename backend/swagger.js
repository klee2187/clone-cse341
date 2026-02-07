const swaggerAutogen = require('swagger-autogen')();
 
const doc = {
  info: {
    title: 'CSE 341 API',
    description: 'Contacts, Temple, and Professional API',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};
const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/contacts.js',
  './routes/index.js',
  './routes/professional.js',
  './routes/temple.js'
];
 
// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);