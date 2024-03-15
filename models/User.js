const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  coverPicture: {
    type: String,
    default: null
  },
  followers: [{
    type: Array,
   default:[]
  }],
  followings: [{
    type: Array,
   default:[]
  }],
  isAdmin: {
    type: Boolean,
    default: true
  },
  desc:{
    type:String,
    max:50
  },
  city:{
    type:String
  },
  from:{
    type:String
  },
  relationship:{
    type:Number,
    enum:[1,2,3] //1-single , 2-in a couple , 3-married
  }
 
},
{timestamps:true}
);


module.exports = mongoose.model('User', userSchema);


