const schedule = require('node-schedule');
const mongoose = require('mongoose');
const Products = mongoose.model("Products");


const popularity_update = schedule.scheduleJob('0 0 3 * * 7', function() {
    Products.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            var maxView = 0;
            var minView = 0;

            var popularity = {};

            for (let i = 0; i < products.length; i++) {
                let product = products[i];
                if (product.numOfViews > maxView) {
                    maxView = product.numOfViews;
                } else if (product.numOfViews < minView) {
                    minView = product.numOfViews;
                }
            }

            for (let i = 0; i < products.length; i++) {
                let product = products[i];
                popularity[product._id] = 50 * product.rating / 5 + 50 * (product.numOfViews - minView) / (maxView - minView);
            }

            Object.keys(popularity).forEach(function(key) {
                Products.update({"_id": key}, {$set: {
                    popularity: popularity[key], 
                    numOfViews: 0
                }}, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Update trending.");
                    }
                    
                })
            });
        }
    });
});