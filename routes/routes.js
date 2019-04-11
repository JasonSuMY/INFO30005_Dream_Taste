const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');
const productsController = require('../controllers/productsController.js');
const usersController = require('../controllers/usersController.js');

// Load the main page.
router.get('/', controllers.loadMainPage);

// Load the log in page.
router.get('/logIn', usersController.logIn);

// Load all the products.
router.get('/products', productsController.allProducts);

// Find by category.
router.get('/products/:category', productsController.findProductByCategory);

//add products.
router.post('/products/addProduct', productsController.addProducts);

module.exports = router;