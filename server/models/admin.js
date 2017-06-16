var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var adminDetailsSchema = new Schema({
  fullname: String,
  username: String,
  password: String,
  age: String,
  contact: String

});

module.exports = mongoose.model('adminDetails',adminDetailsSchema);
