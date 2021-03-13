const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());


const MongoDB_URI = 'mongodb+srv://jakobkubicki:test@musify.vw2a1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("Mongo is connected");
});

const userRouter = require('./routes/User');
app.use('/user',userRouter);

app.listen(5000,()=>{
    console.log('express server started');
});

