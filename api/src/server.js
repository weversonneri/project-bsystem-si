const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./app/models/index');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3333;

app.use('/api', routes);

app.use((req, res, next) => {
  const error = new Error('Page not found!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.log(error);
  return res.send({
    erro: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log('🔥 Server started');

  sequelize.authenticate().then(() => {
    console.log('✅ Successfully connected with database.');
  })
    .catch((error) => {
      console.error('❌ Unable to connect to the database: ', error);
    });
});
