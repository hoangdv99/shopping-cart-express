var Page = require('../models/page');

module.exports.index = (req, res) => {
    Page.findOne({slug: "home"}, (err, page)=>{
        if(page){
            res.render('index', {
                title: page.title,
                content: page.content
            });
        }
    });
}

module.exports.getAPage = (req, res)=>{
    var slug = req.params.slug;
    Page.findOne({slug: slug}, (err, page)=>{
        if(err)
            console.log(err);
        if(page){
            res.render('index', {
                title: page.title,
                content: page.content
            });
        }
    });
};

