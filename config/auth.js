exports.isUser = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.render('user/login', {
            error: 'Please login!'
        });
    }
}

exports.isAdmin = function(req, res, next){
    if(req.isAuthenticated() && res.locals.user.admin === 1){
        next();
    }else{
        res.render('user/login', {
            title: 'Login',
            error: 'Please login as admin!'
        });
    }
}