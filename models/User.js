const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
       'Please add a valid email'
    ]
 }, 
 password: {
   type: String,
   required: [true, 'Please add a password'],
   minlength: 6,
   select: false
  }, 
  isAdmin:{
   type: Boolean,
   default: false,
 },
 followers:{
  type:Array,
  default:[],
},
followings:{
  type:Array,
  default:[],
},
 createdAt: {
  type: Date,
  default: Date.now
 } 
});


// password hash and jwt token
UserSchema.pre('save', async function( ){ 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
}); 
UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
} 
UserSchema.methods.matchPassword =async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password); 
}
module.exports = mongoose.model('User', UserSchema);