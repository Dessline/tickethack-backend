const mongoose = require('mongoose');

const travelSchema = mongoose.Schema({
	departure: String,
	arrival: String,
	date: Date,
	price: Number,
});

const Travel = mongoose.model('travels', travelSchema);

module.exports = Travel;