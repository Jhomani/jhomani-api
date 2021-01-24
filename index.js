const functions = require("firebase-functions");
const path = require('path');
const express = require("express");
const app = express();
// const products = require('./controller/index');

path.join(__dirname, '../db.json');

//body-parser middlewere
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//public files
app.use('/public', express.static(path.join(__dirname, 'assets')));

// routes (API-REST) 
app.use('/users', require('./router/users'));
app.use('/products', require('./router/produts'));
app.use('/categories', require('./router/categories'));

// EJS set
app.set('view engine', 'ejs');

// routes (app) 
app.use('/', require('./router/index'));

app.listen(3000, console.log('listen in the port 3000'));

exports.app = functions.https.onRequest(app);