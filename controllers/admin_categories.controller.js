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

module.exports.getEditCategory = (req, res) => {
    Category.findById(req.params.id, (err, category) => {
        if(err) return console.log(err);
        res.render('admin/edit_category', {
            title: category.title,
            id: category._id
        })
    });
}

module.exports.postEditCategory = async (req, res) => {
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
    if (!errors.length) {
        Category.findById(id, (err, category) => {
            if (err) return console.log(err);
            category.title = title;
            category.slug = slug;
            category.save();
            res.redirect('/admin/categories');
        })
    }
}

module.exports.deleteCategory = (req, res)=>{
    Category.findByIdAndRemove(req.params.id, err=>{
        if(err) return console.log(err);
        else
            res.redirect('/admin/categories');
    });
};