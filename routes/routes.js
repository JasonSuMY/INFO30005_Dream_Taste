const express = require('express');
const router = express.Router();

const controllers = require('../controllers/controllers.js');
const products = require('../controllers/products.js');
const users = require('../controllers/users.js');
const categories = require('../controllers/categories.js');



// Load the main page.
router.get('/', controllers.loadMainPage);

// Display the log in page.
router.get('/login', users.login);

// Validate the user log in.
router.post('/login', users.validateLogin);

// Display the register page.


// Validate the registration information.


// Display all the products.
router.get('/products', products.allProducts);

// Find all products wintin a category.
router.get('/categories/:category', products.findProductByCategory);

// Find product by id
router.get('/products/:id', products.findProductByID);

// Display the add-product page.
router.get('/addProduct', products.displayAddProduct);

// Add the product the the database.
router.post('/addProduct', products.upload.single('image'), products.addProducts);

// Display all the categories
router.get('/categories', categories.allCategories);

module.exports = router;