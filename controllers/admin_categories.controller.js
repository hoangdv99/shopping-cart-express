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

module.exports.postAddCategory = function(req, res){
    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();

    var category = new Category({
        title : title,
        slug: slug
    })
    category.save(err=>{
        if(err){
            console.log(err);
        }
        Category.find((err, categories)=>{
            if(err){
              console.log(err);
            }
            else{
              req.app.locals.categories = categories;
            }
        });
    res.redirect('/admin/categories');
 });
};

module.exports.getEditCategory = (req, res) => {
    Category.findById(req.params.id, (err, category) => {
        if(err) return console.log(err);
        res.render('admin/edit_category', {
            title: category.title,
            id: category._id
        })
    });
}

module.exports.postEditCategory = (req, res) => {
    var title = req.body.title;
    var id = req.params.id;
    var slug = title.replace(/\s+/g, '-').toLowerCase();

    Category.findById(id, (err, category) => {
        if (err) return console.log(err);
        category.title = title;
        category.slug = slug;
        category.save(err=>{
            if(err){
                console.log(err);
            }
            Category.find((err, categories)=>{
                if(err){
                  console.log(err);
                }
                else{
                  req.app.locals.categories = categories;
                }
            });
        });
        res.redirect('/admin/categories');
    })
    
}

module.exports.deleteCategory = (req, res)=>{
    Category.findByIdAndRemove(req.params.id, err=>{
        if(err) return console.log(err);
        
        else{
            Category.find((err, categories)=>{
                if(err){
                  console.log(err);
                }
                else{
                  req.app.locals.categories = categories;
                }
            });
            res.redirect('/admin/categories');
        }
    });
};