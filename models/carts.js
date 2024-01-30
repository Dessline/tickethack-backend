const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
	departure: String,
	arrival: String,
	time: Date,
	price: Number,
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;