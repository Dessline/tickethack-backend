const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
	departure: String,
	arrival: String,
	time: Date,
	price: Number,
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;