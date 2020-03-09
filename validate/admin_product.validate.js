const path = require('path');
const Category = require('../models/category');
const Product = require('../models/product');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
function isDecimal(n)
{
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function isImage(filename){
    var extension = (path.extname(filename)).toLowerCase();
    switch(extension){
        case '.jpg':
            return '.jpg';
        case '.jpeg':
            return '.jpeg';
        case '.png':
            return '.png';
        default:
            return false;
    }
};

module.exports.postAddProduct = async function(req, res, next){
    var title = req.body.title;
    var desc = req.body.desc;
    var price = req.body.price;
    if(!req.file){
        var imageFile = "";
    }
    if(req.file){
        var imageFile = typeof req.file.image !== "undefined" ? req.file.image.name : "";
    }
    var errors = [];
    
    var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    var category = req.body.category;

    if(!title){
        errors.push('Title is required!');
    }
    
    if(!desc){
        errors.push('Description is required!');
    }

    if(!price){
        errors.push('Price is required!');
    }

    if(isDecimal(price) == false){
        errors.push('Price must be a number!');
    }

    if(isImage(imageFile) == false && imageFile !== ""){
        errors.push('An image is required!');
    }

    var existedProduct = await Product.findOne({slug});
    if(existedProduct){
        errors.push('Product exists!');
    }

    if(errors.length){
        Category.find((err, categories)=>{
            res.render('admin/add_product', {
                errors: errors,
                title: title,
                desc: desc,
                categories: categories,
                price: price
            })
        })
        return;
    }
    next();
};

module.exports.postEditProduct = async (req, res, next)=>{
    var title = req.body.title;
    var desc = req.body.desc;
    var price = req.body.price;
    if(!req.files){
        var imageFile = "";
    }
    if(req.files){
        var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";
    }
    var errors = [];
    var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    var id = req.params.id;
    if(!title){
        errors.push('Title is required!');
    }
    
    if(!desc){
        errors.push('Description is required!');
    }

    if(!price){
        errors.push('Price is required!');
    } else if(isDecimal(price) == false){
        errors.push('Price must be a number!');
    }

    if(isImage(imageFile) == false && imageFile !== ""){
        errors.push('An image is required!');
    }

    await Product.findOne({slug: slug, _id: {'$ne': id}}, (err, p)=>{
        if(err) console.log(err);
        if(p){
            errors.push('Product exists!');
        }
    })
    var galleryImages = null;
    await Product.findById(req.params.id, (err, product)=>{
        if(err){
            console.log(err);
        } else{
            var galleryDir = `public/product_images/${product._id}/gallery`;
            galleryImages = fs.readdir(galleryDir);
        } 
    });
    if(errors.length){
        Category.find((err, categories)=>{
            res.render('admin/edit_product', {
                errors: errors,
                title: title,
                desc: desc,
                categories: categories,
                price: price,
                id: id,
                galleryImages: galleryImages
            })
        })
        return;
    }
    next();

}