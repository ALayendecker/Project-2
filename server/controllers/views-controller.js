const express = require("express");
const router = express.Router();
var db = require("../models");

router.get("/", (req, res) => res.render("home", { user: req.user }));
router.get("/settings", (req, res) =>
  res.render("settings", { user: req.user })
);
// router.get("/register", (req, res) => res.render("home", { user: req.user }));
router.get("/register", function(req, res) {
  if (req.user) {
    res.redirect("/me");
  } else {
    res.render("home", { user: req.user });
  }
});

// -----htmlRoutes-----
router.get("/me", function(req, res) {
  // console.log(req.user.id);
  if (req.user) {
    // console.log(req.user.id);
    db.sequelize
      .query(
        `select b.id from boards b
    inner join middles m on m.boardid = b.id
    inner join users u on u.id = m.userid
    where u.id = ?;`,
        { replacements: [req.user.id], type: db.Sequelize.QueryTypes.SELECT }
      )
      .then(data => {
        // console.log(data);
        var dataId = data.map(e => e.id);
        // console.log(dataId);
        // .then(
        db.Board.findAll({
          where: { id: dataId },
          include: [{ model: db.Task }]
        }).then(function(dbBoards) {
          // [ { id: 3 }, { id: 4 } ].map(e=>e.id)
          // console.log("------------");
          // console.log(dbBoards);
          // console.log(dbBoards.map(e => e.id));
          // console.log("------------");
          res.render("workspace", {
            boards: dbBoards,
            user: req.user
          });
        });
      });
    // );
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
