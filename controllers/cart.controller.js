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
                    image: `/product_images/${product._id}/${product.image}`
                });
            }
        }
        res.redirect('back');
    });
    
}

module.exports.getCheckout = (req, res) => {
    if (req.session.cart && req.session.cart.length === 0) {
        delete req.session.cart;
        res.redirect('/cart/checkout');
    } else {
        res.render('user/checkout', {
            title: 'Checkout',
            cart: req.session.cart
        });
    }
};

module.exports.updateProduct = (req, res)=>{
    var slug = req.params.product;
    var cart = req.session.cart;
    var action = req.query.action;

    for(var i = 0; i < cart.length; i++){
        if(cart[i].title === slug){
            switch(action){
                case 'add':
                    cart[i].qty++;
                    break;
                case 'remove':
                    cart[i].qty--;
                    if(cart[i].qty === 0){
                        cart.splice(i, 1);  
                    }
                    break;
                case 'clear':
                    cart.splice(i, 1);
                    if(cart.length === 0)
                        delete req.session.cart;
                    break;
                default:
                    console.log('update problem');
                    break;
            }
            break;
        }
    }
    res.redirect('/cart/checkout');
}