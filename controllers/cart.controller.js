var Product = require('../models/product');

module.exports.addToCart = (req, res)=>{
    var slug = req.params.product;

    Product.findOne({slug: slug}, (err, product)=>{
        if(err){
            console.log(err);
        }

        if(typeof req.session.cart == "undefined"){
            req.session.cart = [];
            req.session.cart.push({
                title: slug,
                qty: 1,
                price: parseFloat(product.price).toFixed(2),
                image: `/product_images/${product._id}/${product.image}`
            });
            
        }else{
            var cart = req.session.cart;
            var newItem = true;

            for(var i=0; i<cart.length; i++){
                if(cart[i].title == slug){
                    cart[i].qty++;
                    newItem = false;
                    break;
                }
            }
            if(newItem){
                cart.push({
                    title: slug,
                    qty: 1,
                    price: parseFloat(product.price).toFixed(2),
                    image: `product_images/${product._id}/${product.image}`
                });
            }
        }
        console.log(typeof(cart));
        res.redirect('back');
    });
}