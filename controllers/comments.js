const mongoose = require('mongoose');
const Comments = mongoose.model('Comments');
const Products = mongoose.model('Products');
const Users = mongoose.model("Users");

const addComment = function(req, res, next) {
    const id = req.params.id;
    const userID = req.session.userID;

    // Find the associated product
    Products.findById(id, function(err, product) {
        if (!err) {

            // Find the author
            Users.findById(userID).exec(function(err, user) {
                if (err) {
                    next(err);
                } else {

                    // Create the comment
                    let newComment = new Comments({
                        body: req.body.body,
                        author: {
                            authorID: user._id,
                            name: user.username,
                            avatar: user.avatar
                        }
                    });

                    newComment.save(function(err) {
                        if (!err) {
                            // Add comment to the product.
                            product.comments.push(newComment);

                            product.save(function(err) {
                                if (!err) {
                                    res.redirect(`/products/${id}`);
                                } else {
                                    next(err);
                                }
                            });
                        } else {
                            next(err);
                        }
                    });
                }
            });
        } else {
            next(err);
        }
    });

    
};

module.exports.addComment = addComment;