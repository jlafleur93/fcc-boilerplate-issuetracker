let chaiHttp = require("chai-http");
let chai = require("chai");
let assert = chai.assert;
let server = require("../server");
const expect = chai.expect;
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("create an issue with every field in the post request", function () {
    test("check that all fields are with the issue", function (done) {
      let issue_title = "yes";
      let issue_text = "no";
      let created_by = "james";
      let assigned_to = "your mom";
      let status_text = "in QA";
      let _id = "01";
      chai
        .request(server)
        .post("/api/issues/test")
        .send({ issue_title, issue_text, created_by, assigned_to, status_text, _id })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(issue_title, "yes");
          assert.equal(issue_text, "no");
          assert.equal(created_by, "james");
          assert.equal(assigned_to, "your mom");
          assert.equal(status_text, "in QA");
          done();
        });
    });
  suite("post average post", ()=>{
    test("required filled in", function (done) {
      let issue_title = "yayeet";
      let issue_text = "same";
      let created_by = "Larry";
      chai
        .request(server)
        .post("/api/issues/same")
        .send({
          issue_title,
          issue_text,
          created_by,
        })
        .end(function (err, res) {
          assert(res.status, 200);

          assert.equal(issue_title, "yayeet");
          assert.equal(issue_text, "same");
          assert.equal(created_by, "Larry");
          done();
        });
    });
  })
  suite("put, required missing", ()=>{
    test("required not filled in", function (done) {
      chai
        .request(server)
        .post("/api/issues/same")
        .send({})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body, "required field(s) missing");
          done();
        });
    });
  })
    suite('PUT to update fields on a issue',()=>{
      test('update on field on an issue',(done)=>{
        chai.request(server)
            .put('/api/issues/apitest')
            .send({
                _id: "01",
                issue_title: 'dunkaroos!!!!!!!!!!!!!'
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.result,'successfully updated');
                assert.equal(res.body._id,"01")
                done();
              });
      })
   
  });
  
  suite("if put request doesn't contain id, throw a error", function(){
    test("if missing id, throw error", (done)=>{
    let issue_title = "yee";
    let issue_text = "Not a fun bug";
    let created_by = "Satan";
    let assigned_to = "joe";
    let status_text = "in QA";
    chai.request(server).put("/api/issues/test").send({issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text,
      }).end(function(err, res){
        console.log(res.body.error)
      assert.equal(res.status, 200);
      assert.equal(res.body.error, "missing _id")
      done();
      })
    })
  })

  suite("can send a get request with all present issues", function(){
    test("gets a reqeuest with all fields present, and returns the get array", (done)=>{
      chai.request(server).get('/api/issues/test').query({}).end(function(err,res){
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        assert.property(res.body[0], 'issue_title');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'created_by');
        assert.property(res.body[0], 'status_text');
        assert.property(res.body[0], '_id');
        assert.property(res.body[0], 'open');
        done();
      })
    })
  })
  suite("can filter a get request by passing along any field and value as a url query", function(){
    test("can pass in a filter and returns an object with the resulting data", (done)=>{
      chai.request(server).get('/api/issues/test?open=true&assigned_to=joe').query({}).end(function(err, res){
        assert.equal(res.status, 200)
        done();
      })
    })
  })

})
});
