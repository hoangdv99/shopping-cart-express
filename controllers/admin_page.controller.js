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

 module.exports.postAddPage = async function(req, res){
    var title = req.body.title;
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var errors = [];
    
    
    if(slug == ""){
        slug = title.replace(/\s+/g, '-').toLowerCase();
    }
    
    if(!title){
        errors.push('Title is required!');
    }

    var existedPage = await Page.findOne({slug: slug});
    if(existedPage){
        errors.push("Existed slug. Choose another!");
    }
    
    if(!content){
        errors.push('Content is required!');
    }

    if(errors.length){
        res.render('admin/add_page', {
            errors: errors,
            values: req.body
        })
        return;
    }
    if(errors.length === 0){
        var page = new Page({
            title : title,
            slug: slug,
            content: content,
            sorting: 0
        })
        page.save();
        res.redirect('/admin/page/pages');
    }

 }

 module.exports.getPagesIndex = (req, res) => {
     Page.find({}).sort({sorting: 1}).exec((err, pages)=>{
         res.render('admin/pages', {
             pages: pages
         })
     })
 }

 module.exports.postReorderPages = async function(req, res){
     var ids = req.body['id[]'];  
     var count = 0;

     for(var i=0; i<ids.length; i++){
         var id = ids[i];
         count++;
         var existedPage = await Page.findById(id);
         existedPage.sorting = count;
         existedPage.save();
     }
 };

module.exports.getEditPage = (req, res) => {
    Page.findOne({ slug: req.params.slug }, (err, page) => {
        if(err) return console.log(err);
        res.render('admin/edit_page', {
            title: page.title,
            slug: page.slug,
            content: page.content,
            id: page._id
        })
    });
}

 module.exports.postEditPage = (req, res) => {
    var title = req.body.title;
    var slug = req.body.slug;
    var content = req.body.content;
    var id = req.body.id;
    var errors = [];
    
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    if(slug == ""){
        slug = title.replace(/\s+/g, '-').toLowerCase();
    }
    
    if(!title){
        errors.push('Title is required!');
    }

    Page.findOne({slug: slug, _id: {'$ne': id}}, (err, page)=>{
        if(err) return console.log(err);
        if(page){
            errors.push('Slug existed. Choose another!');
        }
    });
    
    if(!content){
        errors.push('Content is required!');
    }

    if(errors.length){
        res.render('admin/edit_page', {
            errors: errors,
            values: req.body,
            id: id
        })
        return;
    }
    if(!errors.length){
        Page.findById(id, (err, page)=>{
            if(err) return console.log(err);
            page.title = title;
            page.slug = slug;
            page.content = content;
            page.save();
            res.redirect('/admin/page/pages');
        })
    }
 }

module.exports.deletePage = (req, res)=>{
    Page.findByIdAndRemove(req.params.id, err=>{
        if(err) return console.log(err);
        else
            res.redirect('/admin/page/pages');
    })
}