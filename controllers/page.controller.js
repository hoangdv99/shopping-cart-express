module.exports.index = (req, res) => {
    res.render('index');
}

module.exports.test = (req, res) => {
    res.send('admin test');
}

