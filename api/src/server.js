const express = require('express');
const routes = require('./routes');
const { sequelize } = require('./app/models/index');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`🔥 Server started at http://localhost:${PORT}`);

  sequelize.authenticate().then(() => {
    console.log('✅ Successfully connected with database.');
  })
    .catch((error) => {
      console.error('❌ Unable to connect to the database: ', error);
    });
});
