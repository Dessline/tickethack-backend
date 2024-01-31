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
                    available: true
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
    Cart.find({available: true}).populate('travel').then(data => {
        if (data.length > 0) {
        res.json({ result: true, cart: data})
        } else {
        res.json({ result: false})
        }
    })
})

router.put("/", (req, res) => {
    Cart.updateOne({ $and: [{departure: req.body.departure},{arrival: req.body.arrival},
        {date: req.body.date},{price : req.body.price}]}, {available: false})
    .then(() => {
        Cart.findOne({ $and: [{departure: req.body.departure},{arrival: req.body.arrival},{date: req.body.date},{price : req.body.price}]})
        .then(data => {
            res.json({ result : true, deletedTravel: data})
        })
    })
})

router.put("/all", (req, res) => {
    Cart.updateMany({}, {available: false})
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