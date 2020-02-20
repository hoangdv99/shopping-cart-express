var Category = require('../models/category');

module.exports.postAddCategory = async function(req, res, next){
    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var errors = [];
    
    if(!title){
        errors.push('Title is required!');
    }
    var existedCategory = await Category.findOne({slug: slug});
    if(existedCategory){
        errors.push("Category existed!");
    }
    if(errors.length){
        res.render('admin/add_category', {
            errors: errors
        })
        return;
    }
    next();
 }

 module.exports.postEditCategory = async (req, res, next) => {
    var title = req.body.title;
    var id = req.params.id;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var errors = [];
    if (!title) {
        errors.push('Title is required!');
    }

    var existedCategory = await Category.findOne({slug: slug, _id: {'$ne': id}});
    if(existedCategory){
        errors.push('Existed category. Choose another!');
    }

    if (errors.length) {
        res.render('admin/edit_category', {
            errors: errors,
            title: title,
            id: id
        })
        return;
    }
    next();
}