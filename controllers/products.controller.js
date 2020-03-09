var Product = require('../models/product');
var Category = require('../models/category');
var fs = require('fs-extra');
module.exports.getAllProducts = (req, res) => {
    Product.find((err, products)=>{
        if(err)
            console.log(err);
        
        res.render('user/all_products', {
            title: 'All products',
            products: products
        });
    
    });
}

module.exports.getProductsByCategory = (req, res)=>{
    var categorySlug = req.params.category;
    Category.findOne({slug: categorySlug}, (err, c)=>{
        Product.find({category: categorySlug}, (err, products)=>{
            if(err)
                console.log(err);
            res.render('user/cat_products', {
                title: c.title,
                products: products
            });
        });
    });
};

module.exports.getProductDetails = (req, res)=>{
    var galleryImages = null;
    Product.findOne({slug: req.params.product}, (err, product)=>{
        if(err){
            console.log(err);
        }
        else{
            var galleryDir = `public/product_images/${product._id}/gallery`;

            
            fs.readdir(galleryDir, (err, files)=>{
                if(err){
                    console.log(err);
                }
                else{
                    galleryImages = files;
                    res.render('user/product', {
                        title: product.title,
                        product: product,
                        galleryImages: galleryImages
                    })
                }
            });
        }
    })
}