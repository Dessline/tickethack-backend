var express = require("express")
var router = express.Router()

const Travel = require("../models/travels") 

router.get('/', (req, res) => {

    Travel.find({$and:[{departure : req.body.departure}, {arrival : req.body.arrival}, {date : req.body.date}]})
    .then(data => {
        console.log(data);
        if (data.length > 0) {
		return res.json({result : true, travels : data});
    
       } else {
       return res.json({result :false});
      };

    });
    
});


module.exports = router