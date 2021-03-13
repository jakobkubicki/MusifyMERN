const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Profile = require('../models/profile');

const signToken = userID =>{
    return JWT.sign({
        iss : "jakobkubicki",
        sub : userID
    },"jakobkubicki",{expiresIn : "1h"});
}

router.post('/register',(req,res)=>{
    const { username, password, role} = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(user)
            res.status(400).json({message : {msgBody : "Username is already in use.", msgError: true}});     
        else{
            const newUser = new User({username, password, role});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully created!", msgError: false}});
            });
        }  
    })
});

router.post('/login',passport.authenticate('local',{session:false}),(req,res)=>{
    if(req.isAuthenticated()){
        const {_id, username, role} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token,{httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user : {username, role}});
    }
});

router.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});


router.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin", msgError : true}});
});

router.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});
});

//Routes
// router.post("/save", (req, res) => {
//     console.log('Body: ', req.body);
//     res.json({
//         msg: 'We recieved your data!'
//     });
// });


// router.get("/", (req, res) => {
//     Users.find({})
//     .then((data) => {
//         console.log('Data: ', data);
//         res.json(data);
//     })
//     .catch((error) => {
//         console.log('error: ', daerrorta)
//     });
// });

module.exports = router;