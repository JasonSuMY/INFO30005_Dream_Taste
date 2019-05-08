const mongoose = require('mongoose');
const Products = mongoose.model('Products');

// Load the main page.
let loadMainPage = function(req, res) {
    Products.find(function(err, products) {
        if (!err) {
            res.render("index", {
                title: "All Products",
                products: products
            });
        } else {
            res.sendStatus(400);
        }
    });
}

module.exports.loadMainPage = loadMainPage;