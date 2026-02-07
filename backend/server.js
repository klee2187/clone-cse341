const express = require('express');
cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const professionalRoutes = require('./routes/professional');
const contactRoutes = require('./routes/contacts');
const templeRoutes = require('./routes/temple');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;
const app = express();

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key' 
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/professional', professionalRoutes)
  .use('/contacts', contactRoutes)
  .use('/temple', templeRoutes);

app.get('/', (req, res) => {
  res.send('API is running')
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
