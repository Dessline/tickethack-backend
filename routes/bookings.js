var express = require("express")
var router = express.Router()

const Booking = require("../models/bookings") 

router.get('/', (req, res) => {

    Booking.find({available: true}).populate("travel")
    .then(data => {
        if (data.length > 0) {
		    return res.json({result : true, bookings : data});
        } else {
            return res.json({result : false});
        }
    });
});


router.post('/', (req, res) => {
	Booking.findOne({travel: req.body.travel})
    .then(data => {
		if (data === null) {
					const newBooking = new Booking({
						travel : req.body.travel,
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

    Booking.updateMany({}, {available : false})
        .then(() => {
            Booking.find()
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