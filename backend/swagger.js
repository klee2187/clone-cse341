const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 API',
    description: 'Contacts, Temple, and Professional API',
  },

  // Use Render URL
  host: 'localhost8080',
  schemes: ['http'],

  // ADD SECURITY DEFINITIONS
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'apiKey'
    }
  },

  // APPLY SECURITY GLOBALLY
  security: [
    {
      apiKeyAuth: []
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/contacts.js',
  './routes/index.js',
  './routes/professional.js',
  './routes/temple.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);
