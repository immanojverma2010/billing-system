var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var billerDetailsSchema = new Schema({
  billername: String,
  utilityname: String,
  email: String,
  password: String,
  account: String,
  cities: [String]
});

module.exports = mongoose.model('BillerDetails',billerDetailsSchema);
