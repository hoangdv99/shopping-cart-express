 var Page = require('../models/page');
 module.exports.admin = (req, res) =>{
     res.send('admin area');
 };

module.exports.getAddPage = (req, res)=>{
    var title = "";
    var slug = "";
    var content = "";
    
    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    })
}

 module.exports.postAddPage = (req, res) => {
    var title = req.body.title;
    var slug = req.body.slug;
    var content = req.body.content;
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    if(slug == ""){
        slug = title.replace(/\s+/g, '-').toLowerCase();
    }

    var page = new Page({
        title: title,
        slug: slug,
        content: content,
        sorting: 100
    })
    page.save();
    res.redirect('/admin/page/pages');
 }

 module.exports.getPagesIndex = (req, res) => {
     Page.find({}).sort({sorting: 1}).exec((err, pages)=>{
         res.render('admin/pages', {
             pages: pages
         })
     })
 }

 module.exports.postReorderPages = function(req, res){
     var ids = req.body['id[]'];
     console.log(req.body);    
     var count = 0;

     for(var i=0; i<ids.length; i++){
         var id = ids[i];
         count++;

         Page.findById(id, (err, page)=>{
             page.sorting = count;
             page.save(err=>{
                 if(err) console.log(err);
             });
         });
     }
 };

 module.exports.getEditPage = (req, res) => {
     Page.findOne({slug: req.params.slug}, (err, page)=>{
         if(err) console.log(err);
         res.render('admin/edit_page', {
             title: page.title,
             slug: page.slug,
             content: page.content,
             id: page._id
         })
     })
 };

 module.exports.postEditPage = (req, res) => {
    var title = req.body.title;
    var slug = req.body.slug;   
    var content = req.body.content;
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    if(slug == ""){
        slug = title.replace(/\s+/g, '-').toLowerCase();
    }

    var page = new Page({
        title: title,
        slug: slug,
        content: content,
        sorting: 100
    })
    page.save();
    res.redirect('/admin/page/pages');
 }