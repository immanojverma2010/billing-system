var express = require('express');
var router = express.Router();
var Biller= require('../models/biller')

/* GET  listing. */
router.get('/', function(req, res, next) {
  res.send('Get is responding--no data attatched');
});




router.route("/findBillers")
.post(function (req,res) {
  if(req.body){
      console.log(req.body);

      var city=[];
      city.push(req.body.city);
    Biller.find({cities : {$all : city}},{_id : 0, _v:0},function(err,biller){
      if(err)
      {
        res.send(err);
      }
      else if(biller){
        console.log(biller);
        res.send(biller);

      }
      else{
          obj = {msg : "No biller Present"};
        res.send(obj);
      }
    });
  }
});




router.route("/addBiller")
.post(function (req,res) {
  if(req.body){
      console.log(req.body);
    Biller.findOne({billername:req.body.name}, function(err,biller){
      if(err)
      {
        res.send(err);
      }
      else if(biller){
        var resObj = {msg : "biller named " +req.body.name +" already present"};
        console.log("biller already present");
        res.send(resObj);
      }
      else{
        var billerVar =new Biller();
        billerVar.billername=req.body.name;
        billerVar.utilityname=req.body.utility;
        billerVar.email=req.body.email;
        billerVar.password=req.body.password;
        billerVar.account=req.body.account;
        billerVar.cities=req.body.cities;

        billerVar.save(function(err){
          if(err){
            res.send(err);
          }
          else{
          var resObj = {msg : "biller named " +req.body.name +" inserted"};
            res.send(resObj);
                }
            });
          }
        });
      }
    });

module.exports = router;
