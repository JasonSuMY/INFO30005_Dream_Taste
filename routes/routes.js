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
router.post('/products/addProduct', upload.single('image'),productsController.addProducts);

// Display all the categories
router.get('/categories', categoriesController.allCategories);
module.exports = router;