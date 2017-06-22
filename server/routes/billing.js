var express = require('express');
var router = express.Router();
var Billing= require('../models/billing')

/* GET  listing. */
router.get('/', function(req, res, next) {
  res.send('Get is responding--no data attatched');
});



router.route("/addBill")
.post(function (req,res) {
  if(req.body){
      console.log(req.body);
    Billing.findOne({billerId:req.body.billerId, userId: req.body.userId, paymentFor: req.body.paymentFor}, function(err,bill){
      if(err)
      {
        res.send(err);
      }
      else if(bill){
        var resObj = {msg : "mobile number "+req.body.paymentFor +" Allready Registered with this biller."};
        console.log("mobile number "+req.body.paymentFor +" Allready Registered with this biller.");
        res.send(resObj);
      }
      else{
        var billerVar =new Billing(req.body);


        billerVar.save(function(err){
          if(err){
            res.send(err);
          }
          else{
                if (req.body.paymentMode == "Confirm Pay") {
                      var resObj = {msg : "Payment done and mobile number " +req.body.paymentFor +" registered with the biller"};
                  //    console.log("confirmPay");
                  //    console.log(resObj);
                } else if (req.body.paymentMode == "Auto Pay") {
                      var resObj = {msg : "your mobile number " +req.body.paymentFor +" registered with us we will pay your bill and send you the notification"};
                    //  console.log("autoPay");
                  //    console.log(resObj);
                }
                  else {
                  //  console.log("else");
                  //  console.log(resObj);
                    var resObj = {msg : "Payment done"};
                  }

            res.send(resObj);
                }
            });
          }
        });
      }
    });

module.exports = router;
