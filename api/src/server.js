const path = require('path');
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

app.use('/api/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api', routes);

app.use((req, res, next) => {
  const error = new Error('Page not found!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.error(error);
  return res.send({
    erro: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log('🔥 Server up');

  sequelize.authenticate().then(() => {
    console.log('📦 Connected to db.');
  })
    .catch((error) => {
      console.error('❌ DB connection error: ', error);
    });
});
