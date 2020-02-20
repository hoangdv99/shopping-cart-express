var Page = require('../models/page');

module.exports.postAddPage = async function(req, res, next){
    var title = req.body.title;
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var errors = [];

    if(slug == ""){
        slug = title.replace(/\s+/g, '-').toLowerCase();
    }
    
    if(!title){
        errors.push('Title is required!');
    }

    var existedPage = await Page.findOne({slug: slug});
    if(existedPage){
        errors.push("Existed slug. Choose another!");
    }
    
    if(!content){
        errors.push('Content is required!');
    }

    if(errors.length){
        res.render('admin/add_page', {
            errors: errors,
            values: req.body
        })
        return;
    }
    next();
};

 module.exports.postEditPage = async (req, res, next) => {
    var title = req.body.title;
    var slug = req.body.slug;
    var content = req.body.content;
    var id = req.params.id;
    var errors = [];
    
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    if(slug == ""){
        slug = title.replace(/\s+/g, '-').toLowerCase();
    }
    
    if(!title){
        errors.push('Title is required!');
    }

    await Page.findOne({slug: slug, _id: {'$ne': id}}, (err, page)=>{
        if(err) return console.log(err);
        if(page){
            errors.push('Slug existed. Choose another!');
        }
    });
    
    if(!content){
        errors.push('Content is required!');
    }

    if(errors.length){
        res.render('admin/edit_page', {
            errors: errors,
            values: req.body,
            id: id
        })
        return;
    }
    next();
 }