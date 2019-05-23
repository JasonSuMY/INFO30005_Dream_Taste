const mongoose = require('mongoose');
const Products = mongoose.model('Products');
const Categories = mongoose.model('Categories');
const path = require('path');

// Used to upload image.
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

// Set up the cloud storage space for image upload.
cloudinary.config({
    cloud_name: "hkdac1yvv",
    api_key: "155176919271884",
    api_secret: "sfGPuvLSNAsvOIPbCmCDgb7tjYI"
});

// Initialise storage engine.
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "productImages",
    filename: function(req, file, next) {
        next(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    } 
});

// Initialise upload.
const upload = multer({
    storage: storage,
    limits : {fileSize:  1024 * 1024 * 5},
    fileFilter: function(req, file, next) {
        checkFileType(file, next);
    }
}).single("productImage");

// Check the type of the files.
function checkFileType(file, next) {
    // Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif/;
    
    // Check the file extensions
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    // Check the mime type
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return next(null, true);
    } else {
        next("Error: Images only!");
    }
}

// Upload the image
let uploadImage = function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            Categories.find(function(cateErr, categories) {
                if (!cateErr) {
                    res.render("addProduct", {
                        title: "Fail to add product",
                        msgType: "ERROR",
                        msg: err,
                        categories: categories
                    });
                } else {
                    res.render("addProduct", {
                        title: "Fail to add product",
                        msgType: "ERROR",
                        msg: err + '\n' + cateErr,
                        categories: categories
                    });
                }
            });
        } else {
            next();
        }
    });
};

//Add a new product.
let addProduct = function(req, res) {
    let newProduct = new Products({
        name: req.body.productName.toUpperCase(),
        image: req.file.url,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        rating: req.body.rating,
        comments: req.body.rating
    });

    // Save the product to the database.
    newProduct.save(function(err, newProduct){
        if (!err){
            res.render('product', {
                msgType: "SUCCESS",
                msg: "Success! Product added.",
                product: newProduct
            });
        }else{
            Categories.find(function(cateErr, categories) {
                if (!cateErr) {
                    res.render("addProduct", {
                        title: "Fail to save product",
                        msgType: "ERROR",
                        msg: err,
                        categories: categories
                    });
                } else {
                    res.render("addProduct", {
                        title: "Fail to save product",
                        msgType: "ERROR",
                        msg: err + '\n' + cateErr,
                        categories: categories
                    });
                }
            });
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
let findProductByID = function(req, res) {
    const id = req.params.id;
    Products.findById(id).
        populate('comments').
        exec(function(err, product) {
            if (!err) {
                res.render("productDetail", {
                    title: product.name,
                    product: product,
                    comments: product.comments
                });
            } else {
                res.sendStatus(404);
            }
    });
};

// Search the products based on the query input by user.
let search = function(req, res) {
    const search = req.body.search;
    Products.find({name: { 
                        "$regex": search,
                        "$options": "i"
                    }}, function(err, products) {
        if (err) {
            res.sendStatus(400);
        } else {
            if (products.length > 0) {
                res.render('searchResults', {
                    title: `Search Results for '${search}'`,
                    products: products
                });
            } else {
                res.render('productNotFound', {
                    title: "Product not found!"
                })
            }
        }
    }); 
};

let addRating = function(req, res) {
    const id = req.params.id;

    Products.findById(id, function(err, product) {
        if (!err) {
            if (product == null) {
                res.send("Product not found");
            } else {
                const numOfRatings = product.numOfRatings;
                product.numOfRatings = numOfRatings + 1;

                const rating = product.rating;
                const postedRating = parseInt(req.body.rating);
                
                const newRating = (rating * numOfRatings + postedRating) / product.numOfRatings;

                product.rating = newRating;             

                product.save(function(err) {
                    if (!err) {
                        res.redirect(`/products/${product._id}`);
                    } else {
                        res.send("ERROR: Saving the product with new rating");
                    }
                });
            }
        } else {    
            res.send("ERROR: Finding the product");
        }
    });
}

module.exports.allProducts = allProducts;
module.exports.findProductByCategory = findProductByCategory;
module.exports.displayAddProduct = displayAddProduct;
module.exports.addProduct = addProduct;
module.exports.findProductByID = findProductByID;
module.exports.uploadImage = uploadImage;
module.exports.search = search;
module.exports.addRating = addRating;