var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userDetailsSchema = new Schema({
  fullname: String,
  username: String,
  password: String,
  age: String,
  contact: String

});

module.exports = mongoose.model('UserDetails',userDetailsSchema);
