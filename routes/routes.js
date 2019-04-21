const express = require('express');
const router = express.Router();

// Used to upload image.
const multer= require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})
const upload = multer({storage: storage});

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

// Display all the products.
router.get('/products', products.allProducts);

// Find by category.
router.get('/products/:category', products.findProductByCategory);

// Add products.
router.post('/products/addProduct', upload.single('image'), products.addProducts);

// Display all the categories
router.get('/categories', categories.allCategories);

module.exports = router;