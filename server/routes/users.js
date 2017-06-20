var express = require('express');
var router = express.Router();
var User= require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Get is responding--no data attatched');
});


router.route("/addUser")
.post(function (req,res) {
  if(req.body){
      console.log(req.body);
    User.findOne({username:req.body.userName}, function(err,user){
      if(err)
      {
        res.send(err);
      }
      else if(user){
        var resObj = {msg : "user named " +req.body.userName +" already present"};
        console.log("user already present");
        res.send(resObj);
      }
      else{
        var userVar =new User();
        userVar.fullname=req.body.firstName +" " +req.body.lastName;
        userVar.username=req.body.userName;
        userVar.password=req.body.password;
        userVar.age=req.body.age;
        userVar.contact=req.body.contact;
        userVar.account=req.body.account;

        userVar.save(function(err){
          if(err){
            res.send(err);
          }
          else{
          var resObj = {msg : "user named " +req.body.userName +" inserted"};
            res.send(resObj);
                }
            });
          }
        });
      }
    });

module.exports = router;
