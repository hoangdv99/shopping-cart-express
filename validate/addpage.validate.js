var Page = require("../models/page")

module.exports.postAddPage = function(req, res, next){
    var errors = [];
    var title = req.body.title;
    var slug = req.body.slug;
    var content = req.body.content;
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    if(slug == ""){
        slug = title.replace(/\s+/g, '-').toLowerCase();
    }

    if(!title){
        errors.push('Title is required');
    }

    Page.findOne({slug : slug}, function(err, page){
        if(page){
            errors.push('Page slug exists, choose another');
        }
    })
    if (!content) {
        errors.push('Content is required');
    }
    
    if (errors.length) {
        res.render('admin/add_page', {
            errors: errors,
            values : req.body
        });
        return;
    }
    next();
}

module.exports.postEditPage = function(req, res, next){
    var errors = [];
    var title = req.body.title;
    var slug = req.body.slug;
    var content = req.body.content;
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    if(slug == ""){
        slug = title.replace(/\s+/g, '-').toLowerCase();
    }

    if(!title){
        errors.push('Title is required');
    }

    if (!content) {
        errors.push('Content is required');
    }
    
    if (errors.length) {
        res.render('admin/edit_page', {
            errors: errors,
            values : req.body,
            id: id
        });
        return;
    }
    if(errors.length === 0){
        Page.findOne({ slug: slug, _id: {'$ne':id} }, function(err, page){
            if(page){
                errors.push('Slug existed. Choose another!');
                res.render('admin/edit_page', {
                    title: title,
                    slug: slug,
                    content: content
                })
            }
        })
    }
    next();
}