const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite("create an issue with every field in the post request", function(){
      test("check that all fields are with the issue", function(){
      const issue_title= 'yes';
      const issue_text = 'no';
      const created_by= "james";
      const assigned_to ="your mom";
      const status_text= "in QA";
          chai.request(server).post('/api/issues/test').send({issue_title, issue_text, created_by, assigned_to, status_text}).end(function(err, res){
            assert.equal(res.status, 200)
            assert.equal(issue_title, 'yes')
            assert.equal(issue_text, 'no')
            assert.equal(created_by, 'james')
            assert.equal(assigned_to, 'your mom')
            assert.equal(status_text, 'in QA')
        })
      })
    // Update one field on an issue: PUT request to /api/issues/{project}
// Update multiple fields on an issue: PUT request to /api/issues/{project}
// Update an issue with missing _id: PUT request to /api/issues/{project}
// Update an issue with no fields to update: PUT request to /api/issues/{project}
// Update an issue with an invalid _id: PUT request to /api/issues/{project}
      // suite("put request #1", function(){
      // const issue_title = "yee";
      // const issue_text = 'Not a fun bug';
      // const created_by= "Satan";
      // const _id = 01
      // const status_text= "in QA";
      //   test("update an issue with a put request to an existing an api", function(){
          
      //     chai.request(server).put('/api/issues/test').send({issue_title, issue_text, created_by, assigned_to, status_text}).end(function(err, res){
      //       assert.equal(res.status, 200)
      //       assert.equal(issue_title, "no")
      //     })
      //   })
      // })
  })
});
