var express = require('express');
var router = express.Router();
const Cart = require('../models/carts');

router.post("/", (req, res) => {
    Cart.findOne({departure: req.body.departure},{arrival: req.body.arrival},
        {date: req.body.date},{price : req.body.price})
        .then(dbData => {
            if (dbData === null) {
                const newCart = new Cart ({
                    departure: req.body.departure,
                    arrival: req.body.arrival,
                    date: req.body.date,
                    price: req.body.price,
                    availaible: true
                })
                newCart.save().then(newDoc => {
                    res.json({ result: true, newTravel: newDoc })
                })
            } else {
                res.json({ result: false })
            }
    })
})

router.get("/", (req, res) => {
    Cart.find().then(data => {
        res.json({ result: true, cart: data})
    })
})

router.put("/", (req, res) => {
    Cart.updateOne({ $and: [{departure: req.body.departure},{arrival: req.body.arrival},
        {date: req.body.date},{price : req.body.price}]}, {availaible: false})
    .then(() => {
        Cart.findOne({departure: req.body.departure},{arrival: req.body.arrival},{date: req.body.date},{price : req.body.price})
        .then(data => {
            res.json({ result : true, deletedTravel: data})
        })
    })
})

router.put("/all", (req, res) => {
    Cart.updateMany({}, {availaible: false})
    .then(() => {
        Cart.find({})
        .then(data => {
            res.json({ result : true, deletedTravels: data})
        })
    })
})

router.delete("/all", (req, res) => {
    Cart.deleteMany()
    .then(() => {
        Cart.find({})
        .then(data => {
            res.json({ result : true, deletedTravels: data})
        })
    })
})

module.exports = router