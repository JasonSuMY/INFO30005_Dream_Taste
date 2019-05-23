const mongoose = require('mongoose');
const Comments = mongoose.model('Comments');
const Products = mongoose.model('Products');

const addComment = function(req, res) {
    const id = req.params.id;

    Products.findById(id, function(err, product) {
        if (!err) {

            let newComment = new Comments({
                title: req.body.title,
                body: req.body.body
            });

            newComment.save(function(err) {
                if (!err) {
                    product.comments.push(newComment);

                    product.save(function(err) {
                        if (!err) {
                            res.redirect(`/products/${id}`);
                        } else {
                            res.status(400).send(err);
                        }
                    });
                } else {
                    res.status(400).send(err);
                }
            });
        } else {
            res.status(400).send(err);
        }
    });

    
};

module.exports.addComment = addComment;