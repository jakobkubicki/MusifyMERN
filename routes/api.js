const express = require('express');

const router = express.Router();

const Users = require('../models/users');


//Routes
router.post("/save", (req, res) => {
    console.log('Body: ', req.body);
    res.json({
        msg: 'We recieved your data!'
    });
});


router.get("/", (req, res) => {
    Users.find({})
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta)
    });
});

module.exports = router;