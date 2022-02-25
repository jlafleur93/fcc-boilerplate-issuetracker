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
      const queryStr = req.query;
      function isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
      }
      if (isEmptyObject(queryStr)) {
        return res.json(arr);
      }

      if (Object.keys(queryStr).length === 1) {
        switch (queryStr) {
          case queryStr.open:
            return res.json(arr.filter((x) => x.open));
          case queryStr.status_text:
            return res.json(
              arr.filter((x) => x.status_text === queryStr.status_text),
            );
          case queryStr.assigned_to:
            return res.json(
              arr.filter((x) => x.assigned_to === queryStr.assigned_to),
            );
          case queryStr.created_by:
            return res.json(
              arr.filter((x) => x.assigned_to === queryStr.assigned_to),
            );
          case queryStr.issue_title:
            return res.json(
              arr.filter((x) => x.issue_title === queryStr.issue_title),
            );
          case queryStr.issue_text:
            return res.json(
              arr.filter((x) => x.issue_text === queryStr.issue_text),
            );
        }
      }

      return res.json(arr);
    })

    .post(function (req, res) {
      let project = req.params.project;
      project = {};
      const issue_title = req.body.issue_title;
      const issue_text = req.body.issue_text;
      const assigned_to = req.body.assigned_to || "";
      const status_text = req.body.status_text || "";
      const created_by = req.body.created_by;
      const updated_on = Date.now();
      let created_on = Date.now();

      if (!issue_title || !issue_text || !created_by) {
        res.json({ error: "required field(s) missing" });
      }

      const _id = generateRandomString();
      let newProject = {
        issue_title,
        issue_text,
        assigned_to,
        created_by,
        status_text,
        _id,
        created_on,
        open: true,
        updated_on,
      };
      arr.push(newProject);
      res.json(newProject);
    })

    .put(function (req, res) {
      let project = req.params.project;
      const {
        _id,
        issue_text,
        issue_title,
        created_by,
        created_on,
        assigned_to,
        status_text,
      } = req.body;
      if (req.body["_id"] === undefined) {
        return res.json({ error: "missing _id" });
      }

      let issueFind = arr.find((x) => x._id === _id);

      if (!issueFind) {
        return res.json({ error: "no issue with id given is found" });
      }
      function emptyPropertyRemover(object) {
        let newObject = object;
        Object.keys(newObject).forEach((key) => {
          if (newObject[key] === "") {
            delete newObject[key];
          }
        });
        return newObject;
      }

      let newObj = emptyPropertyRemover(req.body);
      console.log(issueFind, newObj);
      arr = newObj;
      res.json({ result: "successfully updated", _id: req.body["_id"] });
    })

    .delete(function (req, res) {
      let project = req.params.project;
      project = req.body;
      if (!req.body.hasOwnProperty("_id")) {
        res.json({ error: "please enter an _id to delete" });
      }
      let _id = req.body["_id"];
      for (let i in arr) {
        if (arr[i]["_id"] === _id) {
          arr.shift(i);
        }
      }
      res.json({ _id: `${_id} removed` });
    });
};
