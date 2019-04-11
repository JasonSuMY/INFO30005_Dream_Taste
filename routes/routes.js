const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

// Load the main page.
router.get('/', controllers.loadMainPage);

// Load the log in page.
router.get('/logIn', controllers.logIn);

// Load all the products.
router.get('/products', controllers.allProducts);

// Find by category.
router.get('/products/:category', controllers.findProductByCategory);

//add products.
router.post('/products', controllers.addProducts);

module.exports = router;