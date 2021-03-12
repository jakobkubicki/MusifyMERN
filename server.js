const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

const routes = require('./routes/api')

const MongoDB_URI = 'mongodb+srv://jakobkubicki:test@musify.vw2a1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("Mongo is connected");
});


// //Save data to mongodb
// const data = {
//     username: 'John',
//     password: 'test'
// };

//const newUser = new UserModel(data);

// newUser.save((error) => {
//     if(error) {
//         console.log("Error");
//     } else {
//         console.log("Data has been saved to DB");
//     }
// });
// .save();

//HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes)


app.listen(PORT, console.log(`Server is running on ${PORT}`));