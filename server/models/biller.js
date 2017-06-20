var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var billerDetailsSchema = new Schema({
  billername: String,
  utilityname: String,
  email: String,
  password: String,
  account: String
});

module.exports = mongoose.model('BillerDetails',billerDetailsSchema);
