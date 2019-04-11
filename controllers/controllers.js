// Load the main page.
let loadMainPage = function(req, res) {
    res.sendFile("index.html", {root: __dirname + '/../public/'});
}

module.exports.loadMainPage = loadMainPage;