var express = require('express');
var News= require('../models/news')
var router = express.Router();


//fetching all saved news from db
router.route("/savednews")
.post(isLoggedIn,function(req, res){

  // var movieVar = new Movie();
  //  movieVar.imdbID = req.params.movieId;
  var category=req.body.category;
  var searchNews=req.body.searchNews;
  /*when searching in all saved news*/
  if(category=="All" && searchNews=="blank"){
    News.find({}, function(err,news){
      if(err)
      {
        res.send(err);
      }
      else if(news){
        console.log("Specfic news in MongoDB fetched res");
        res.send(news);
      }
      else{
        res.send("No News");
      }

    })
  }
  /*when searching in specific category with specific keyword*/
  else if(category=="All" && searchNews!="blank"){
    //searchNews="/^"+searchNews+"/i"
    console.log(searchNews);

    News.find({title: new RegExp(searchNews, 'i')}, function(err,news){
      if(err)
      {
        res.send(err);
      }
      else if(news){
        console.log("Specfic news in MongoDB fetched res");
        res.send(news);
      }
      else{
        res.send("No News");
      }

    })
  }
  //when searching with category
  else if (category!="All" && searchNews=="blank") {
    News.find({category:category}, function(err,news){
      if(err)
      {
        res.send(err);
      }
      else if(news){
        console.log("Specfic news in MongoDB fetched res");
        res.send(news);
      }
      else{
        res.send("No News");
      }

    })

  }
  //when searching with category and search box
  else if(category!="All" && searchNews!="blank"){
    console.log(searchNews);

    News.find({title: new RegExp(searchNews, 'i'),category:category}, function(err,news){
      if(err)
      {
        res.send(err);
      }
      else if(news){
        console.log("Specfic news in MongoDB fetched res");
        res.send(news);
      }
      else{
        res.send("No News");
      }

    })
  }

});




router.route("/add")
.post(isLoggedIn,function(req, res){

  if(req.body){
    var newsVar = new News(req.body);

    News.findOne({urlToImage:newsVar.urlToImage},{urlToImage:true},function(err,data) {
      if(err){
        throw err;
      }
      else if(data){
        console.log("News already present");
        res.send("this News is already present in your favourites");
      }

      else{
        newsVar.save(function(err){
          if(err)
          {
            res.send(err);
          }
          else {
            console.log("News inserted in Mongo");
            res.send("News added successfully");
          }
        })
      }
    })
  }
});

//deleteing saved news
router.route("/remove/:newsId")
.delete(isLoggedIn,function(req, res){
  //console.log("I am printing "+req.params.newsId);
  if(req.params.newsId){
    News.remove({newid:req.params.newsId},function(err){
      if(err)
      {
        res.send(err);
      }
      else {
        console.log("News deleted from Mongo");
        res.send("News deleted");
      }
    })
  }
});


//Updating saved news
router.route("/update")
.put(isLoggedIn,function(req, res){
  console.log("put req called " +req.body.newid+"    "+req.body.comments);
  if(req.body){

    News.update({ newid: req.body.newid }, { comments: req.body.comments },function(err){
      if(err)
      {
        res.send(err);
      }
      else {
        console.log("Updated the news")
        res.send("Updated news");
      }
    })
  }
});


//function to check whether the user is logged in or not
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.json('Not authenticated!!! plz login or register with us')
  }
}

module.exports = router;
