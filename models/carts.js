const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
	travel: { type: mongoose.Schema.Types.ObjectId, ref: 'travels' },
	available: Boolean,
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;