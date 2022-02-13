"use strict";

module.exports = function (app) {
  let retObj = {};
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
      console.log(`what is project`, project);
      res.json({ project, _id });
    })

    .post(function (req, res) {
      let project = req.params.project;
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
      };
      retObj = project;
      console.log(`retobj here`, retObj);
      res.json(project);
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
