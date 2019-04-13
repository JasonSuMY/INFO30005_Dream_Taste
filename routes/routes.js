const express = require('express');
const router = express.Router();

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
router.post('/products/addProduct', productsController.addProducts);

// Display all the categories
router.get('/categories', categoriesController.allCategories);

module.exports = router;