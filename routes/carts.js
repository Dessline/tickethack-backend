var express = require('express');
var router = express.Router();
const Cart = require('../models/carts');

router.post("/", (req, res) => {
    Cart.findOne({travel: req.body.travel})
        .then(dbData => {
            console.log(dbData)
            if (dbData === null) {
                const newCart = new Cart ({
                    travel: req.body.travel,
                    available: true,
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
    Cart.updateOne({travel: req.body.travel}, {available: false})
    .then(() => {
        Cart.findOne({travel: req.body.travel})
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