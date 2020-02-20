var Product = require('../models/product');
var Category = require('../models/category');
var mkdirp = require('mkdirp');
var fse = require('fs-extra');
var resizeImg = require('resize-img');


module.exports.getProductsIndex = (req, res)=>{
    var count;

    Product.countDocuments((err, c)=>{
        count = c;
    });
    Product.find((err, products)=>{
        res.render('admin/products', {
            products: products,
            count: count
        });
    });
};

module.exports.getAddProduct = (req, res)=>{
    var title = "";
    var desc = "";
    var price = "";
    Category.find((err, categories)=>{
        res.render('admin/add_product', {
            title: title,
            desc: desc,
            categories: categories,
            price: price
        });
    });
    
};



module.exports.postAddProduct = function(req, res){
    var title = req.body.title;
    var desc = req.body.desc
    var price = parseFloat(req.body.price).toFixed(2);
    if(!req.files){
        var imageFile = "";
    }
    if(req.files){
        var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";
    }
    var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    var category = req.body.category;

    var product = new Product({
        title: title,
        desc: desc,
        slug: slug,
        price: price,
        category: category,
        image: imageFile
    });
    product.save(err=>{
        if(err) return console.log(err);
        
        mkdirp(`public/product_images/${product._id}`);

        mkdirp(`public/product_images/${product._id}/gallery`);

        mkdirp(`public/product_images/${product._id}/gallery/thumbs`);
        if(imageFile !== ""){
            var productImage = req.files.image;
            var path = `public/product_images/${product._id}/${imageFile}`;
            productImage.mv(path);
        }
        res.redirect('/admin/products');
    });
    
 }