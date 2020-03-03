var Product = require('../models/product');
var Category = require('../models/category');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');

module.exports.getProductsIndex = async (req, res)=>{
    var count;

    await Product.countDocuments((err, c)=>{
        count = c;
    });
    Product.find((err, products)=>{
        if(err) console.log(err);
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
        
        mkdirp.sync(`public/product_images/${product._id}`);

        mkdirp.sync(`public/product_images/${product._id}/gallery`);

        mkdirp.sync(`public/product_images/${product._id}/gallery/thumbs`);
        if(imageFile !== ""){
            var productImage = req.files.image;
            var path = `public/product_images/${product._id}/${imageFile}`;
            productImage.mv(path);
        }
        res.redirect('/admin/products');
    });
    
 }

module.exports.getEditProduct = (req, res) => {
    var errors;
    
    if(req.session.errors)
        errors = req.session.errors;
    
    req.session.errors = null;
    Category.find((err, categories)=>{
        Product.findById(req.params.id, (err, product)=>{
            if(err){
                console.log(err);
                res.redirect('/admin/products');
            } else{
                var galleryDir = `public/product_images/${product._id}/gallery`;
                var galleryImages = null;

                fs.readdir(galleryDir, (err, files)=>{
                    if(err) console.log(err);
                    else{
                        galleryImages = files;
                        res.render('admin/edit_product', {
                            title: product.title,
                            errors: errors,
                            desc: product.desc,
                            categories: categories,
                            category: product.category.replace(/\s+/g, '-').toLowerCase(),
                            price: parseFloat(product.price).toFixed(2),
                            galleryImages: galleryImages,
                            id: product._id,
                            image: product.image
                        });
                    }
                });
            }

        });
    });
}

module.exports.postEditProduct = (req, res)=>{
    if(!req.files){
        var imageFile = "";
    }
    if(req.files){
        var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";
    }
    console.log(imageFile);
    var title = req.body.title;
    var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    var category = req.body.category;
    var id = req.params.id;
    var price = parseFloat(req.body.price).toFixed(2);
    var desc = req.body.desc;
    var pimage = req.body.pimage;
    Product.findById(id, function (err, p) {
        if (err)
            console.log(err);

        p.title = title;
        p.slug = slug;
        p.desc = desc;
        p.price = parseFloat(price).toFixed(2);
        p.category = category;
        if (imageFile !== "") {
            p.image = imageFile;
            if (pimage !== "") {
                fs.remove(`public/product_images/${p._id}/${pimage}`);
            }

            var productImage = req.files.image;
            var path = `public/product_images/${p._id}/${imageFile}`;

            productImage.mv(path);
        }
        p.save();
        
    });
    res.redirect('/admin/products');
};

module.exports.postGallery = (req, res)=>{
    var productImage = req.files.file;
    var id = req.params.id;
    var path = `public/product_images/${id}/gallery/${productImage.name}`;
    var thumbsPath = `public/product_images/${id}/gallery/thumbs/${productImage.name}`;

    productImage.mv(path, err=>{
        if(err)
            console.log(err);
        resizeImg(fs.readFileSync(path), {width: 100, height: 100})
        .then(buf=>{
            fs.writeFileSync(thumbsPath, buf);
        });
    });
    res.sendStatus( 200 );
};

module.exports.deleteImage = (req, res)=>{
    var originalImage = `public/product_images/${req.query.id}/gallery/${req.params.image}`;
    var thumbImage = `public/product_images/${req.query.id}/gallery/thumbs/${req.params.image}`;

    fs.remove(originalImage, err=>{
        if(err) console.log(err);
        else{
            fs.remove(thumbImage, err=>{
                if(err) console.log(err);
                else
                    res.redirect(`/admin/products/edit-product/${req.query.id}`);
            });
        }
    })
}