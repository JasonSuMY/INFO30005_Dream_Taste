const express = require('express');
const router = express.Router();

const controllers = require('../controllers/controllers.js');
const products = require('../controllers/products.js');
const users = require('../controllers/users.js');
const categories = require('../controllers/categories.js');
const comments = require('../controllers/comments.js');



// Load the main page.
router.get('/', controllers.loadMainPage);

// Display the log in page.
router.get('/login', users.login);

// Validate the user log in.
router.post('/login', users.validateLogin);

// Display the register page.
router.get('/register', users.displayRegister);

// Validate the registration information.
router.post('/register', users.register);

// Display all the products.
router.get('/products', products.allProducts);

// Find all products wintin a category.
router.get('/categories/:category', products.findProductByCategory);

// Find product by id
router.get('/products/:id', products.findProductByID);

// Display the add-product page.
router.get('/addProduct', products.displayAddProduct);

// Add the product the the database.
router.post('/addProduct', products.uploadImage, products.addProduct);

// Display all the categories
router.get('/categories', categories.allCategories);

// Display the search results based on the user's query.
router.post('/search', products.search);

// Add comment to the product.
router.post('/addComment/:id', comments.addComment);

module.exports = router;