const mongoose = require('mongoose');
const Products = mongoose.model('Products');

// Load the main page.
let loadMainPage = function(req, res) {
    Products.find(function(err, products) {
        if (!err) {
            res.render("index", {
                title: "Home",
                products: products
            });
        } else {
            res.sendStatus(400);
        }
    });
}

let requiresLogin = function(req, res, next) {
    if (req.session && req.session.userID) {
        return next();
    } else {
        req.flash("error", "Requires login.");
        res.redirect("back");
    }
};

module.exports.loadMainPage = loadMainPage;
module.exports.requiresLogin = requiresLogin;