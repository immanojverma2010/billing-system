var should = require("chai").should(),
// expect = require("chai").expect,
// assert = require("chai").assert,

supertest = require("supertest"),
server = supertest.agent('http://localhost:8080'),
app = require("../app");

//var url = supertest("http://localhost:8080");



describe("Testing the first route", function(err){
  it('login', loginUser());
  it("should check the reteived favourite news", function(done){
    server
        .post("/news/savednews")
        .expect(200)
        .send({"category":"All","searchNews":""
          })
        .end(function(err,res){
          if (err) {

				        throw err;
			    }
        res.body[0].newid.should.be.equal("220161114T074859Z");
        done();
        });
  });
});


describe("Testing the second route", function(err){
  it('login', loginUser());
  it("should check for duplicate news", function(done){
    server
        .post("/news/add")
        .expect(200)
        .send({"newid":"520161114T050933Z","author":"http://www.abc.net.au/news/julia-holman/4760348",
        "title":"US 'no dumping ground' for Australia's refugees","description":"The Obama administration could rush through the Australia-United States resettlement deal to get people on Manus Island and Nauru resettled before Donald Trump is sworn in, an immigration expert says.","url":"http://www.abc.net.au/news/2016-11-14/us-expert-questions-refugee-resettlement-plan/8023946",
        "urlToImage":"http://www.abc.net.au/news/image/6961658-1x1-700x700.jpg","publishedAt":"2016-11-14T05:09:33Z","category":"politics",
        "comments":"akjkks"
          })
        .end(function(err,res){
          if (err) {

				        throw err;
			    }
        res.text.should.be.equal("this News is already present in your favourites");
        done();
        });
  });
});

function loginUser() {
   return function(done) {
       server
           .post('/login')
           .send({ username: 'admin', password: 'admin' })
           .expect(200)
           .end(onResponse);

       function onResponse(err, res) {
          if (err) return done(err);
          return done();
       }
   };
};
