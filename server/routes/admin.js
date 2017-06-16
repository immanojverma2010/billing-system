var express = require('express');
var router = express.Router();
var Admin= require('../models/admin')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Get is responding--no data attatched');
});


router.route("/addAdmin")
.post(function (req,res) {
  if(req.body){
    console.log(req.body);
    var adminVar =new Admin(req.body);

  adminVar.save(function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send("Admin Inserted");
    }
  });
}
});



router.route("/adminLogIn")
.post(function (req,res) {
  if(req.body){
    console.log(req.body);

  Admin.findOne({username:req.body.username,password:req.body.password}, function(err,admin){
    if(err){
      res.send(err);
    }
    else{
            res.send(admin);
    }
  });
}
});

module.exports = router;
