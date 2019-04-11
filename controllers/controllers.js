const mongoose = require('mongoose');
const Products = mongoose.model('products');

// Load the main page.
let loadMainPage = function(req, res) {
    res.sendFile("index.html", {root: __dirname + '/../public/'});
}

// Load log in page.
let logIn = function(req, res) {
    res.send("Log in page");
};

// Load all the products.
let allProducts = function(req, res) {
    Products.find(function(err, products) {
        if (!err) {
            res.send(products);
        } else {
            res.sendStatus(400);
        }
    });
}

let findProductByCategory = function(req, res) {
    const productCategory = req.params.category;
    Products.find({category: productCategory}, function(err, products) {
        if (!err) {
            res.send(products);
        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.loadMainPage = loadMainPage;
module.exports.logIn = logIn;
module.exports.allProducts = allProducts;
module.exports.findProductByCategory = findProductByCategory;