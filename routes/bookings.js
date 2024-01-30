var express = require("express")
var router = express.Router()

const User = require("../models/bookings") 

router.get('/', (req, res) => {

    Booking.find({departure : { $regex: new RegExp(req.body.daparture, 'i') }}, {arrival : { $regex: new RegExp(req.body.arrival, 'i') }}, {date : req.body.date})
    .then(data => {

        if (data) {
		return res.json({result : true, bookings : data });
    
        } else {
        return res.json({result :false});
        }

    });


    
});


router.post('/', (req, res) => {
	Booking.findOne({ departure : { $regex: new RegExp(req.body.daparture, 'i') } }, { arrival : { $regex: new RegExp(req.body.arrival, 'i') } }, {date : req.body.date}).then(data => {
		if (data === null) {
            
					const newBooking = new Booking({
						departure: req.body.daparture,
	                    arrival: req.body.arrival,
	                    date: eq.body.date,
	                    price: eq.body.price,
					});

			
					newBooking.save().then(newDoc => {
						res.json({ result : true, booking : newDoc});
					});
                } else {
                    // Booking already exists in database
                    res.json({ result: false });
                }
		});

		 
	});
 


module.exports = router