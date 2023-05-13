
const mongoose = require('mongoose')


const User = new mongoose.model('User', new mongoose.Schema({
      email: {type: String},
      userName: {type: String},
      password: {type: String}
}) ) ;

exports.User= User;
 



