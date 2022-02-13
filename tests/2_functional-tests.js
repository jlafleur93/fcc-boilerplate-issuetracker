const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite("create an issue with every field in the post request", function(){
      test("check that all fields are with the issue", function(){
          chai.request(server).post('/api/issues/').send({issue_title: 'yes', 
        issue_text: 'no', 
        created_by: "james", 
        assigned_to: "your mom",
        status_text: "in QA"}).end(function(err, res){
            assert.equal(res.status, 200)
            assert.equal(issue_title, 'yes')
            assert.equal(issue_text, 'no')
            assert.equal(created_by, 'james')
            assert.equal(assigned_to, 'your mom')
            assert.equal(status_text, 'in QA')
            

        })
      })
  })
});
