var User = require('../models/user');

module.exports.postRegister = async (req, res, next)=>{
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var errors = [];

    if(!name){
        errors.push('Name is required!');
    }
    
    if(!email){
        errors.push('Email is required!');
    }

    if(!username){
        errors.push('Username is required!');
    }

    if(!password){
        errors.push('Password is required!');
    }
    if(password2 !== password){
        errors.push('Passwords do not match!');
    }

    await User.findOne({username: username}, function(err, user){
        if(err){
            console.log(err);
        }
        if(user){
            errors.push('Username exists, choose another!');
        }
    })

    if(errors.length){
        res.render('user/register', {
            errors: errors,
            title: 'Register',
            values: req.body
        });
        return;
    }
    next();
}