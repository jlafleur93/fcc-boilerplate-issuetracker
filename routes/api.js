"use strict";

const bodyParser = require("body-parser");

// Create an issue with every field: POST request to /api/issues/{project}
// Create an issue with only required fields: POST request to /api/issues/{project}
// Create an issue with missing required fields: POST request to /api/issues/{project}
// View issues on a project: GET request to /api/issues/{project}
// View issues on a project with one filter: GET request to /api/issues/{project}
// View issues on a project with multiple filters: GET request to /api/issues/{project}

// Delete an issue: DELETE request to /api/issues/{project}
// Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
// Delete an issue with missing _id: DELETE request to /api/issues/{project}
module.exports = function (app) {
  let arr = []
  
  function generateRandomString() {
    let randomString = "";
    for (let i = 0; i <= 6; i++) {
      randomString += Math.round(Math.random() * 10);
    }
    return randomString;
  }
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      const _id = req.params._id;
      project
      console.log(`get request`,project.project)
      res.json( arr );
    })

    .post(function (req, res) {
      let project = req.params.project;
      project = {}
      const issue_title = req.body.issue_title;
      const issue_text = req.body.issue_text;
      const assigned_to = req.body.assigned_to;
      const created_by = req.body.created_by;
      const status_text = req.body.status_text;
      
      const _id = generateRandomString();
      project = {
        issue_title,
        issue_text,
        assigned_to,
        created_by,
        status_text,
        _id,
        open : true,
      };
      arr.push(project)
      res.json(project);
    })

    .put(function (req, res) {
      let project = req.params.project;
      console.log(`reqbody`,req.body)
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
const issues = [
  {
    issue_title: 'zztop',
    issue_text: 'da fasd',
    assigned_to: 'joe qwe',
    created_by: 'asd',
    status_text: 'open',
    _id: '8672761',
    open: true
  },
  {
    issue_title: 'll',
    issue_text: 'da fasd',
    assigned_to: 'joe qwe',
    created_by: 'asd',
    status_text: 'open',
    _id: '8852220',
    open: true
  },
]

function issueFinder(issue, id,options){
  let opt = ["issue_title",
  "issue_text",
  "assigned_to",
  "created_by",
  "status_text",
  "_id",
  ]
  let newId = Number(id)
  if(newId){
    if(options){
      let ret = issue.filter(x => x._id === id)
      ret = options
      return ret
    }
    let ret = issue.filter(x => x._id === id)
    const idHelp = "_id"
    let newObj = {
      issue_text: "",
      issue_title: "", 
      created_by: "",
      status_text: "" ,
      open: true,
      _id: ret[0][idHelp]
    }
  
    return newObj
    

  }
  console.error("required field(s) missing")
}
const options = {
  issue_title: 'newVal',
    issue_text: 'dad',
    assigned_to: 'joe king',
    created_by: 'deez nuts',
    status_text: 'closed due to aids',
}
let newFind = issueFinder(issues, "ds0")
let str = "asdf"
console.log(newFind)