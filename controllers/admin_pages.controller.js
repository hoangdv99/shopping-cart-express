var Page = require('../models/page');
module.exports.admin = (req, res) => {
    res.send('admin area');
};

module.exports.getAddPage = (req, res) => {
    var title = "";
    var slug = "";
    var content = "";

    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    })
}

module.exports.postAddPage = async function (req, res) {
    var title = req.body.title;
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;

    var page = new Page({
        title: title,
        slug: slug,
        content: content,
        sorting: 0
    })
    await page.save();
    Page.find({}).sort({ sorting: 1 }).exec((err, pages) => {
        if (err)
            console.log(err);
        else {
            req.app.locals.pages = pages;
        }
    });
    res.redirect('/admin/pages');
}

module.exports.getPagesIndex = (req, res) => {
    Page.find({}).sort({ sorting: 1 }).exec((err, pages) => {
        res.render('admin/pages', {
            pages: pages
        })
    })
}
// Sort pages function
function sortPages(ids, callback) {
    var count = 0;

    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        count++;

        (function (count) {
            Page.findById(id, (err, page) => {
                page.sorting = count;
                page.save(err => {
                    if (err)
                        return console.log(err);
                    ++count;
                    if (count >= ids.length) {
                        callback();
                    }
                });
            });
        })(count);
    }
}


module.exports.postReorderPages = function (req, res) {
    var ids = req.body['id[]'];

    sortPages(ids, function () {
        Page.find({}).sort({ sorting: 1 }).exec((err, pages) => {
            if (err)
                console.log(err);
            else {
                req.app.locals.pages = pages;
            }
        });
    });
}
module.exports.getEditPage = (req, res) => {
    Page.findById(req.params.id, (err, page) => {
        if (err) return console.log(err);
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
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();;
    var content = req.body.content;
    var id = req.params.id;
    var errors = [];
    Page.findById(id, (err, page) => {
        if (err) return console.log(err);
        page.title = title;
        page.slug = slug;
        page.content = content;
        page.save();
        res.redirect('/admin/pages');
    });
}

module.exports.deletePage = (req, res) => {
    Page.findByIdAndRemove(req.params.id, err => {
        if (err) return console.log(err);
        else
            Page.find({}).sort({ sorting: 1 }).exec((err, pages) => {
                if (err)
                    console.log(err);
                else {
                    req.app.locals.pages = pages;
                }
            });
            res.redirect('/admin/pages');
    })
}