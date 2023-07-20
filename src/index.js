const express = require('express')
const morgan = require('morgan');
const app = express()
const port = 3000
const db = require('./config/db');
const route = require('./routes');

//HTTP logger
// app.use(morgan('combined'))

//connect DB
db.connect();

app.use(
  express.urlencoded({
      extended: true,
  }),
);

app.use(express.json());


//Route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})