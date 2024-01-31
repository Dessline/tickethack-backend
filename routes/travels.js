var express = require("express")
var router = express.Router()

const Travel = require("../models/travels") 

router.post('/', (req, res) => {
    let startDate = new Date(req.body.date);
    let endDate = new Date(startDate)
        endDate.setDate(startDate.getDate() + 1)
    Travel.find({$and:[{departure : req.body.departure}, {arrival : req.body.arrival}, {date : {$gte: startDate, $lt: endDate}}]})
        .then(data => {
            if (data.length > 0) {
                return res.json({result : true, travels : data});
            } else {
                return res.json({result : false, travels: data});
            };
        });
    });


module.exports = router