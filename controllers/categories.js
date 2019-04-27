const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');

// Display all the categories defined in the database.
let allCategories = function(req, res) {
    Categories.find(function(err, categories) {
        if (!err) {
            res.render("categories", {
                title: "All Categories",
                categories: categories
            });
        } else {
            res.sendStatus(400);
        }
    });
};

module.exports.allCategories = allCategories;