const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');

let allCategories = function(req, res) {
    Categories.find(function(err, categories) {
        if (!err) {
            res.send(categories);
        } else {
            res.sendStatus(400);
        }
    });
};

module.exports.allCategories = allCategories;