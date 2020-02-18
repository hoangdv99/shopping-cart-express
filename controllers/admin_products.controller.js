var Product = require('../models/product');
var Category = require('../models/category');

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
