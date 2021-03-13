const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min : 6,
        max: 15
    },
    password: {
        type: String,
        required: true,
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        required: true
    },
    userProfile : [{type : mongoose.Schema.Types.ObjectId, ref: 'Profile'}]
});

userSchema.pre('save', function(next){
    if(!this.isModified('password'))
        return next()
    bcrypt.hash(this.password, 10,(err,passwordHash) => {
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

userSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null,isMatch);
            return cb(null,this);
        }
    })
}

//Model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;