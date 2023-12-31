const mongoose = require('mongoose');
const Review = require('./Review');

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    imageUrl: {
        type: String
    },
    desc: {
        type: String
    },
    price: {
        type: Number
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, {versionKey: false, timestamps: true});


// Mongoose middleware function to delete all the associated reviews on a product
productSchema.post('findOneAndDelete',async function(product) {
    if (product.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: product.reviews } });
    }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;