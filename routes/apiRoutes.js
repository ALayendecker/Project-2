var db = require("../models");

var bcrypt = require("bcrypt");
// const localPassword = "localpass123";
var saltRounds = 10;

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/signup", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  //register: storing name, email and password and redirecting to home page after signup
  app.post("/user/create", function(req, res) {
    bcrypt.hash(req.body.passwordsignup, saltRounds, function(err, hash) {
      db.User.create({
        name: req.body.usernamesignup,
        email: req.body.emailsignup,
        password: hash
      }).then(function(data) {
        if (data) {
          res.redirect("/home");
        }
      });
    });
  });

  //login page: storing and comparing email and password,and redirecting to home page after login
  app.post("/user", function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if (!user) {
        res.redirect("/");
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (result === true) {
            res.redirect("/home");
          } else {
            res.send("Incorrect password");
            res.redirect("/");
          }
        });
      }
    });
  });

  //generate hash
  db.User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  //check if pw is a valid pass
  db.User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.localPassword);
  };
};
