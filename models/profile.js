const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const profileSchema = new Schema({
    favArtist : {
        type: String,
        required:true
    }
})

//Model
const profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;