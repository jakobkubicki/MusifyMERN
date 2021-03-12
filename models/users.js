const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    password: String,
});

//Model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;