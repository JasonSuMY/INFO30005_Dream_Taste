const mongoose = require('mongoose');
const Products = mongoose.model('Products');
const Categories = mongoose.model('Categories');

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
        picture: req.body.picture,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        rating: req.body.rating
    });

    // Check whether the category of the new product exists in our database.
    Categories.findOne({name: newProduct.category}, function(err, category) {
        if (category) {
            newProduct.save(function(err, newProduct){
                if(!err){
                    res.send(newProduct);
                }else{
                    res.sendStatus(400);
                }
            });
        } else {
            res.send("The category is not defined.");
        }
    });
    
};

module.exports.allProducts = allProducts;
module.exports.findProductByCategory = findProductByCategory;
module.exports.addProducts = addProducts;