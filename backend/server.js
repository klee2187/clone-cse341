const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const practiceRoutes = require('./routes/practice');
const templeRoutes = require('./routes/temple')
const contactsRoutes = require('./routes/contacts');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/contacts', contactsRoutes)
  .use('/practice', practiceRoutes)
  .use('/temple', templeRoutes)
  .use('api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});