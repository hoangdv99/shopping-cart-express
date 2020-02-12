const express = require('express');
const app = express();
const port = 3003;
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database'); 
const bodyParser = require('body-parser');
var session = require('express-session');

//connect to mongodb
mongoose.connect(config.database, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//express-session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));



//View engine setup
app.set('view engine', 'pug');
app.set('views', './views');

//set public folder
app.use(express.static('public'));

//set routes
var page = require('./routes/page');
var adminPage = require('./routes/admin_page');
app.use('/', page);
app.use('/admin/page', adminPage);

//start server
app.listen(port, () => console.log(`App listening on ${port}`));
