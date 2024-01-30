var express = require("express")
var router = express.Router()

const Booking = require("../models/bookings") 

router.get('/', (req, res) => {

    Booking.find({$and: [{departure : req.body.departure}, {arrival : req.body.arrival}, {date : req.body.date}]})
    .then(data => {

        if (data.length > 0) {
		return res.json({result : true, bookings : data});
    
        } else {
        return res.json({result : false});
        }

    });


    
});


router.post('/', (req, res) => {
	Booking.findOne({$and:[{departure : req.body.departure}, {arrival : req.body.arrival}, {date : req.body.date}]}).then(data => {
		if (data === null) {
            
					const newBooking = new Booking({
						departure: req.body.departure,
	                    arrival: req.body.arrival,
	                    date: req.body.date,
	                    price: req.body.price,
                        available: true,
					});

			
					newBooking.save().then(newDoc => {
						res.json({result : true, booking : newDoc});
					});
                } else {
                    // Booking already exists in database
                    res.json({result: false});
                }
		});

		 
	});
 
    router.put('/', (req, res) => {

            Booking.updateMany({$and: [{departure : { $regex: new RegExp(req.body.departure, 'i') }}, {arrival : { $regex: new RegExp(req.body.arrival, 'i') }}, {date : req.body.date}]}, {available : false})
        .then(() => {
            Booking.find({$and: [{departure : { $regex: new RegExp(req.body.departure, 'i') }}, {arrival : { $regex: new RegExp(req.body.arrival, 'i') }}, {date : req.body.date}]})
            .then(data => {

                if (data.length > 0) {
                    return res.json({result : true, travels : data });
                
                    } else {
                    return res.json({result :false});
                    }

            }) 
    
        });
    
    });

module.exports = router