let chaiHttp = require("chai-http");
let chai = require("chai");
let assert = chai.assert;
let server = require("../server");
const expect = chai.expect;
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("create an issue with every field in the post request", function () {
    test("check that all fields are with the issue", function (end) {
      let issue_title = "yes";
      let issue_text = "no";
      let created_by = "james";
      let assigned_to = "your mom";
      let status_text = "in QA";
      chai
        .request(server)
        .post("/api/issues/test")
        .send({ issue_title, issue_text, created_by, assigned_to, status_text })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(issue_title, "yes");
          assert.equal(issue_text, "no");
          assert.equal(created_by, "james");
          assert.equal(assigned_to, "your mom");
          assert.equal(status_text, "in QA");
          end();
        });
    });
    test("required filled in", function (end) {
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
          end();
        });
    });
    test("required not filled in", function (end) {
      chai
        .request(server)
        .post("/api/issues/same")
        .send({})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body, "required field(s) missing");
          end();
        });
    });

    // Update one field on an issue: PUT request to /api/issues/{project}
    // Update multiple fields on an issue: PUT request to /api/issues/{project}
    // Update an issue with missing _id: PUT request to /api/issues/{project}
    // Update an issue with no fields to update: PUT request to /api/issues/{project}
    // Update an issue with an invalid _id: PUT request to /api/issues/{project}
    suite("put request #1", function () {
      let issue_title = "yee";
      let issue_text = "Not a fun bug";
      let created_by = "Satan";
      let assigned_to = "joe";
      let status_text = "in QA";
      test("update an issue with a put request to an existing an api", function () {
        chai
          .request(server)
          .put("/api/issues/test")
          .send({
            issue_title,
            issue_text,
            created_by,
            assigned_to,
            status_text,
            _id: "01",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(issue_title, res.body.issue_title);
            assert.equal(issue_text, res.body.issue_text);
            assert.equal(created_by, res.body.created_by);
            assert.equal(assigned_to, res.body.assigned_to);
            assert.equal(status_text, res.body.status_text);
            assert.equal("01", res.body._id);
          });
      });
    });
  });
});
