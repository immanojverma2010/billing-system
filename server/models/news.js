
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsDetailsSchema = new Schema({
  newid: String,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  category: String,
  comments: String

});

module.exports = mongoose.model('newsdetails',newsDetailsSchema);
