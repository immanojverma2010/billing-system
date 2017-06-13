var express = require('express');
var router = express.Router();
var User= require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Get is responding--no data attatched');
});


router.route("/add")
.post(function (req,res) {
  if(req.body){
    console.log(req.body);
    var userVar =new User();
    userVar.fullname=req.body.fullname;
    userVar.username=req.body.username;
    userVar.password=req.body.password;
    userVar.age=req.body.age;
    userVar.contact=req.body.contact;
    /*userVar.save(function(err){
    .
    ..
  });
  */
  //var userVar=new User(req.body);
  userVar.save(function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send("User Inserted");
    }
  });
}
});







/*
router.post('/checkname', function(req, res, next) {
var obj=[{name:"Manoj", occupation: "Devloper"},{name:"Naveen", occupation: "SrDevloper"},{name:"Prasan", occupation: "JrDevloper"}];
console.log(req.query.fname);
var result=obj.filter(function(a) {
if(a.name==req.query.fname){
return a;
}
});


res.json("Hi post"+JSON.stringify(Jresult));

});

*/

module.exports = router;
