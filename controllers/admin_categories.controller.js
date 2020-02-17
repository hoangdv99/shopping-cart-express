var Category = require('../models/category');

module.exports.getCategories = (req, res)=>{
    Category.find((err, categories)=>{
        if(err) return console.log(err);
        res.render('admin/categories',{
            categories: categories
        });
    });
};

module.exports.getAddCategory = (req, res)=>{
    var title = "";
    res.render('admin/add_category', {
        title: title
    });
};

module.exports.postAddCategory = async function(req, res){
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
    if(errors.length === 0){
        var category = new Category({
            title : title,
            slug: slug
        })
        category.save();
        res.redirect('/admin/categories');
    }

 }
