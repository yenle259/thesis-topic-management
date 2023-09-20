const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const db = require('./config/db');
const route = require('./routes');
const cookieParser = require('cookie-parser');

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

app.use(cookieParser())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
