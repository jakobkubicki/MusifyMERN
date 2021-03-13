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

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const userRouter = require('./routes/User');
app.use('/user',userRouter);

app.listen(process.env.PORT || 5000,()=>{
    console.log('express server started');
});
