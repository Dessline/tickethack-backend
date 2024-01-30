var express = require("express")
var router = express.Router()

const User = require("../models/travels") 

router.get('/', (req, res) => {

    Travel.find({departure : req.body.departure}, {arrival : req.body.arrival}).then(data => {
        if (data) {
		return res.json({result :true, travels : data });
    
        } else {
        return res.json({result :false});
        }

    });
    
});


module.exports = router