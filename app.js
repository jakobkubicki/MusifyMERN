const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const User = require("./models/User");
const router = express.Router();
const cors = require('cors');
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const MongoDB_URI = 'mongodb+srv://jakobkubicki:test@musify.vw2a1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("Mongo is connected");
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
  }

app.use("/", router);

router.route("/getData").get(function(req, res) {
    User.find({}).then(eachOne => {
        res.json(eachOne);
    })
});

app.use(express.static(path.join(__dirname, "client", "build")))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

const userRouter = require('./routes/User');
app.use('/user',userRouter);


app.listen(process.env.PORT || 5000,()=>{
    console.log('express server started');
});
