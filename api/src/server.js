const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./app/models/index');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use(routes);

app.listen(PORT, () => {
  console.log('🔥 Server started');

  sequelize.authenticate().then(() => {
    console.log('✅ Successfully connected with database.');
  })
    .catch((error) => {
      console.error('❌ Unable to connect to the database: ', error);
    });
});
