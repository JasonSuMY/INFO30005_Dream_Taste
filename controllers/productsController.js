const mongoose = require('mongoose');
const Products = mongoose.model('Products');

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

// Find all the products within a category.
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

// Add a new product.
let addProducts = function(req, res) {
    let newProduct = new Products({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
    });
    newProduct.save(function(err,newProduct){
        if(!err){
            res.send(newProduct);
        }else{
            res.sendStatus(400);
        }
    });
};

module.exports.allProducts = allProducts;
module.exports.findProductByCategory = findProductByCategory;
module.exports.addProducts = addProducts;