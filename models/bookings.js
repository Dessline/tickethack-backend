const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
	travel: { type: mongoose.Schema.Types.ObjectId, ref: 'travels' },
	available: Boolean,
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;