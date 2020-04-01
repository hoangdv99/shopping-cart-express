const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database'); 
const bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var session = require('express-session');
var passport = require('passport');

app.use(fileUpload());
//connect to mongodb
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!');
});

//

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//express-session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
//  cookie: { secure: true }
}));



//get page model
var Page = require('./models/page');
Page.find({}).sort({sorting: 1}).exec((err, pages)=>{
  if(err)
    console.log(err);
  else{
    app.locals.pages = pages;
  }
});

//get categories
var Category = require('./models/category');
Category.find((err, categories)=>{
  if(err){
    console.log(err);
  }
  else{
    app.locals.categories = categories;
  }
});

//View engine setup
app.set('view engine', 'pug');
app.set('views', './views');

//set public folder
app.use(express.static('public'));

app.get('*', function(req, res, next){
  res.locals.cart = req.session.cart;
  res.locals.user = req.user || null;
  next();
});

//Passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set routes
var page = require('./routes/page.route');
var products = require('./routes/products.route');
var cart = require('./routes/cart.route');
var adminPages = require('./routes/admin_pages.route');
var adminCategories = require('./routes/admin_categories.route');
var adminProducts = require('./routes/admin_products.route');
var users = require('./routes/users.route');
app.use('/cart', cart);
app.use('/', page);
app.use('/products', products);
app.use('/admin/pages', adminPages);
app.use('/admin/categories', adminCategories);
app.use('/admin/products', adminProducts);
app.use('/users', users);

//start server
app.listen(port, () => console.log(`App listening on ${port}`));

