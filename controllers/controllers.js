// Load the main page.
let loadMainPage = function(req, res) {
    res.render('index', {
        title: "Home"
    });
}

module.exports.loadMainPage = loadMainPage;