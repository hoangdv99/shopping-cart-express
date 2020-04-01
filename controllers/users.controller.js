var User = require('../models/user');
var passport = require('passport');
var bcrypt = require('bcryptjs');

module.exports.getRegister = (req, res)=>{
    res.render('user/register', {
        title: 'Register'
    });
}


module.exports.postRegister = (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    var user = new User({
        name: name,
        email: email,
        username: username,
        password: password,
        admin: 0
    });

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){
                console.log(err);
            }
            user.password = hash;
            user.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/users/login');
                }
            });
        });
    });
    
}