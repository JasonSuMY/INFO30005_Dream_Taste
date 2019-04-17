const mongoose = require('mongoose');
const Products = mongoose.model('Products');
const Categories = mongoose.model('Categories');

const express = require('express');
const router = express.Router();
const multer= require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({storage: storage});//.single('image');



const controllers = require('../controllers/controllers.js');
const productsController = require('../controllers/productsController.js');
const usersController = require('../controllers/usersController.js');
const categoriesController = require('../controllers/categoriesController.js');


// Load the main page.
router.get('/', controllers.loadMainPage);

// Validate the user log in.
router.post('/logIn', usersController.logIn);

// Display all the products.
router.get('/products', productsController.allProducts);

// Find by category.
router.get('/products/:category', productsController.findProductByCategory);

// Add products.
router.post('/products/addProduct', upload.single('image'),function(req,res){//productsController.addProducts);
    console.log(req.file);
    let newProduct = new Products({
        name: req.body.name,
        image: req.file.path,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        rating: req.body.rating,
        comments: req.body.rating
    });

    //Check whether the category of the new product exists in our database.
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
});


// Display all the categories
router.get('/categories', categoriesController.allCategories);
module.exports = router;