const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');

router.post('/products/:id/reviews', async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = new Review({ rating, comment });
    const product = await Product.findById(id);
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/products/${id}`);
});
router.delete('/products/:id/reviews/:reviewId', async(req, res) => {
    const productId = req.params.id;
    const reviewId = req.params.reviewId;
    await Review.findByIdAndDelete(reviewId);

    const product = await Product.findByIdAndUpdate( productId,
      { $pull: { reviews: reviewId } }, // Removing reviewId from reviews array
      { new: true }
    );

    res.redirect(`/products/${productId}`);
  });

module.exports = router;