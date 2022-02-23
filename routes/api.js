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
  let arr = [];

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
     project =[{
        "issue_title": "this site sucks",
          "issue_text": "agreed",
          "assigned_to":"jimbob",
          "created_by": "Jimbobs ex",
          "status_text": "get rekt jimbob",
          "_id": "01",
          "open": "true",
          created_on: Date.now(),
      }, 
      {
        "issue_title": "I love you son",
          "issue_text": "Yeet",
          "assigned_to":"Jimdad",
          "created_by": "jimsdad",
          "status_text": "I did your mom, ha gottem!",
          "_id": "09",
          "open": "true",
          created_on: Date.now(),
      }]
      const queryStr = req.query
      function isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
    }
    if(isEmptyObject(queryStr)){
      res.json(project);
    }
      function filterQuery(query, database){
        let retObj = {}
        let opt = [
          "issue_title",
          "issue_text",
          "assigned_to",
          "created_by",
          "status_text",
          "_id",
          "open",
        ];
        let newQueue = Object.keys(query)
        let queue = query
          console.log(newQueue.length,queue)
          if(newQueue.length === 1){
            let filter = database.filter(x => x[newQueue[0]] === queue[newQueue[0]])
            retObj = filter
          }
        return retObj
      }
      let newFilter = filterQuery(queryStr, project)
      project = newFilter
      res.json(project)
    })

    .post(function (req, res) {
      let project = req.params.project;
      project = {};
      const issue_title = req.body.issue_title;
      const issue_text = req.body.issue_text;
      const assigned_to = req.body.assigned_to;
      if (!assigned_to || !issue_text || !issue_title) {
        let obj = { error: "required field(s) missing" };
        return res.json(obj.error);
      }
      const created_by = req.body.created_by;
      const status_text = req.body.status_text;
      let created_on = Date.now();

      const _id = generateRandomString();
      project = {
        issue_title,
        issue_text,
        assigned_to,
        created_by,
        status_text,
        _id,
        created_on,
        open: true,
      };
      arr.push(project);
      res.json(arr[0]);
    })

    .put(function (req, res) {
      let project = req.params.project;
      if(!req.body["_id"]){
        res.json({error:"missing _id"})
      }
      let issue = issueFinder(arr, req.body["_id"], req.body);

      project = issue;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]["_id"] === issue._id) {
          arr[i] = issue;
        }
      }
      project["updated_on"] = Date.now();
      res.json({_id: req.body["_id"], result: "successfully updated" });
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};

function issueFinder(issue, id, options) {
  let opt = [
    "issue_title",
    "issue_text",
    "assigned_to",
    "created_by",
    "status_text",
    "_id",
  ];
  let newId = Number(id);
  if (newId) {
    if (options) {
      let ret = issue.filter((x) => x._id === id);
      ret = options;
      for (let i = 0; i < opt.length; i++) {
        if (options[opt[i]] === undefined) {
          ret[opt[i]] = "";
        }
      }
      return ret;
    }
    let ret = issue.filter((x) => x._id === id);
    const idHelp = "_id";
    let newObj = {
      issue_text: "",
      issue_title: "",
      created_by: "",
      status_text: "",
      open: true,
      _id: ret[0][idHelp],
    };

    return newObj;
  }
  console.error("required field(s) missing");
}
