const mongoose = require('mongoose');
const Products = mongoose.model('Products');
const Categories = mongoose.model('Categories');
const express = require('express');
const path = require('path');

// Used to upload image.
const multer = require('multer');

// Initialise storage engine.
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, next) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// Initialise upload.
const upload = multer({
    storage: storage,
    limits : {fileSize: 1024 * 1024 * 5}
}).single("productImage");

//Add a new product.
let addProduct = function(req, res) {
    let newProduct = new Products({
        name: req.body.name,
        image: req.file.path,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        rating: req.body.rating,
        comments: req.body.rating
    });

    // Save the product to the database.
    newProduct.save(function(err, newProduct){
        if(!err){
            res.redirect('/products');
        }else{
            res.sendStatus(400);
        }
    });
};

// Load all the products.
let allProducts = function(req, res) {
    Products.find(function(err, products) {
        if (!err) {
            res.render("products", {
                title: "All Products",
                products: products
            });
        } else {
            res.sendStatus(400);
        }
    });
};

// Find all the products within a category.
let findProductByCategory = function(req, res) {
    const productCategory = req.params.category;
    Products.find({category: productCategory}, function(err, products) {
        if (!err) {
            res.render("products", {
                title: productCategory,
                products: products
            });
        } else {
            res.sendStatus(404);
        }
    });
};

// Display the add-prodcut page to the user.
let displayAddProduct = function(req, res) {
    Categories.find(function(err, categories) {
        if (!err) {
            res.render('addProduct', {
                title: "Add Product",
                categories: categories
            });
        } else {
            res.sendStatus(400);
        }
    });
};

// Find a product by its ID.
let findProductByID = function findProductByID(req, res) {
    const id = req.params.id;
    Products.findById(id, function(err, product) {
        if (!err) {
            res.render("product", {
                title: product.name,
                product: product
            })
        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.allProducts = allProducts;
module.exports.findProductByCategory = findProductByCategory;
module.exports.displayAddProduct = displayAddProduct;
module.exports.addProduct = addProduct;
module.exports.findProductByID = findProductByID;
module.exports.upload = upload;