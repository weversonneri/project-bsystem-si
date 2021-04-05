const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log('🔥 Server started at http://localhost:3000');
});
