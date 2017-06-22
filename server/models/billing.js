var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var billingDetailsSchema = new Schema({
  userId : String,
  userAccount: String,
  userName: String,String,
  billerId: String,
  billerAccount:String,
  billerName:String,
  utilityName:String,
  paymentFor:String,
  paymentMode:String,
  billDate: String,
  dueDate:String,
  txnDate:String
});

module.exports = mongoose.model('BillingDetails',billingDetailsSchema);
