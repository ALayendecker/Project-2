const express = require("express");
const router = express.Router();
var db = require("../models");

router.get("/", (req, res) => res.render("home", { user: req.user }));
// router.get("/me", (req, res) => res.render("workspace", { user: req.user }));
router.get("/register", (req, res) => res.render("home", { user: req.user }));

// -----htmlRoutes-----
router.get("/me", function(req, res) {
  if (req.user) {
    db.Board.findAll({
      include: [{ model: db.Task }]
    }).then(function(dbBoards) {
      // console.log("DBBOARDS", dbBoards);
      res.render("workspace", {
        boards: dbBoards,
        user: req.user
      });
    });
  } else {
    res.render("404");
    // window.location = "/";
  }
});

router.get("/board/:id", function(req, res) {
  db.Board.findOne({ where: { id: req.params.id } }).then(function(dbBoard) {
    res.render("board", {
      board: dbBoard
    });
  });
});

router.get("/task/:id", function(req, res) {
  db.Task.findOne({ where: { id: req.params.id } }).then(function(dbTask) {
    res.render("task", {
      task: dbTask
    });
  });
});

router.get("*", function(req, res) {
  res.render("404");
});
// -----endhtmlRoutes-----

module.exports = router;
