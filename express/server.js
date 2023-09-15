const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors');

const app = express();

const dbOptions = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'sigamalogin'
};

app.use(myconn(mysql, dbOptions));
app.use(cors());

const imagesRouter = require('./routes/routes');
app.use(imagesRouter);

app.listen(9000, () => {
    console.log('server running on', 'http://localhost:' + 9000);
});
