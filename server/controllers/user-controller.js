const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

// grab the User model from the models folder, the sequelize
// index.js file takes care of the exporting for us and the
// syntax below is called destructuring, its an es6 feature
const { User } = require("../models");
var db = require("../models");

db.User.hasMany(db.AuthToken);
db.AuthToken.belongsTo(db.User);

db.Board.hasMany(db.Task, {
  onDelete: "cascade"
});
db.Task.belongsTo(db.Board);

db.Board.belongsToMany(db.User, { through: db.Middle });
db.User.belongsToMany(db.Board, { through: db.Middle });
/* Register Route
========================================================= */
router.post("/register", async (req, res) => {
  // console.log(req);
  // hash the password provided by the user with bcrypt so that
  // we are never storing plain text passwords. This is crucial
  // for keeping your db clean of sensitive data
  const hash = bcrypt.hashSync(req.body.password, 10);

  try {
    // create a new user with the password hash from bcrypt
    let user = await User.create(Object.assign(req.body, { password: hash }));

    // data will be an object with the user and it's authToken
    let data = await user.authorize();

    // send back the new user and auth token to the
    // client { user, authToken }
    return res.json(data);
  } catch (err) {
    return res.send("error from user controller register");
  }
});

/* Login Route
========================================================= */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // if the username / password is missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!username || !password) {
    return res.status(400).send("Request missing username or password param");
  }
  try {
    // we will cover the user authenticate method in the next section
    let user = await User.authenticate(username, password);
    // console.log("--------------");
    // console.log(user);
    // console.log("--------------");
    return res.json(user);
  } catch (err) {
    return res.send("error from user controller");
  }
});

/* Logout Route
========================================================= */
router.delete("/logout", async (req, res) => {
  // because the logout request needs to be send with
  // authorization we should have access to the user
  // on the req object, so we will try to find it and
  // call the model method logout
  const {
    user,
    cookies: { auth_token: authToken }
  } = req;

  // we only want to attempt a logout if the user is
  // present in the req object, meaning it already
  // passed the authentication middleware. There is no reason
  // the authToken should be missing at this point, check anyway
  if (user && authToken) {
    await req.user.logout(authToken);
    return res.status(204).send();
  }

  // if the user missing, the user is not logged in, hence we
  // use status code 400 indicating a bad request was made
  // and send back a message
  return res.status(400).send({ errors: [{ message: "not authenticated" }] });
});

/* Me Route - get the currently logged in user
========================================================= */
// router.get("/me", (req, res) => {
//   if (req.user) {
//     console.log(req);
//     console.log(req.user);
//     res.render("workspace", req.user);
//     return res.send(req.user);
//   }
//   res.status(404).send({ errors: [{ message: "missing auth token" }] });
// });

// export the router so we can pass the routes to our server

// -----apiRoutes-----
router.get("/api/boards", function(req, res) {
  db.Board.findAll({}).then(function(dbBoards) {
    res.json(dbBoards);
  });
});

router.get("/api/tasks", function(req, res) {
  db.Task.findAll({}).then(function(dbTasks) {
    res.json(dbTasks);
  });
});

// Create a new board
// router.post("/api/boards", function(req, res) {
//   db.Board.create(req.body).then(function(dbBoard) {
//     res.json(dbBoard);
//   });
// });
router.post("/api/boards", function(req, res) {
  db.Board.create({ text: req.body.text }).then(data => {
    db.User.findOne({ where: { id: req.body.UserId } }).then(function(user) {
      db.Board.findOne({ where: { id: data.id } }).then(function(board) {
        user.addBoards([board]);
      });
    });
  });
});

router.post("/api/tasks", function(req, res) {
  db.Task.create(req.body).then(function(dbTask) {
    res.json(dbTask);
  });
});

// Delete an board by id
router.delete("/api/boards/:id", function(req, res) {
  db.Board.destroy({ where: { id: req.params.id } }).then(function(dbBoard) {
    res.json(dbBoard);
  });
});

router.delete("/api/tasks/:id", function(req, res) {
  db.Task.destroy({ where: { id: req.params.id } }).then(function(dbTask) {
    res.json(dbTask);
  });
});

router.put("/changeUsername", function(req, res) {

  db.User.count({ where: {username: req.body.currentUsername} }).then(function(count){
    if (count === 0) {
      throw Error ('Current Username Does Not')
    } else {
      db.User.update(
        {
          username: req.body.newUsername
        },
        {
          where: {
            username: req.body.currentUsername
          }
        }
      ).then(function(dbUser) {
        res.json(dbUser);
      });
    }
  })
    

});

router.put("/user", function(req, res) {
  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update
  db.User.update(
    {
      username: req.body.newUsername
    },
    {
      where: {
        username: req.body.currentUsername
      }
    }
  ).then(function(dbUser) {
    res.json(dbUser);
  });
});

router.post("/api/adduser", function(req, res) {
  // console.log(req.body);
  // console.log(req.body.username);
  // console.log(req.body.temporaryId);
  // console.log("-----------");
  db.Board.findOne({ where: { id: req.body.temporaryId } }).then(function(
    board
  ) {
    // console.log(board);
    if (board === null) {
      return res.send("Board doesn't exist");
    } else {
      db.User.findOne({ where: { username: req.body.username } }).then(function(
        user
      ) {
        // console.log(user);
        if (user === null) {
          return res.send("User doesn't exist");
        } else {
          try {
            board.addUsers([user]);
            return res.send("User successfully added to Board");
          } catch (err) {
            return res.send(err);
          }
        }
      });
    }
  });
});

router.put("/changeUsername", function(req, res) {

  db.User.count({ where: {username: req.body.currentUsername} }).then(function(count){
    if (count === 0) {
      throw Error ('Current Username Does Not')
    } else {
      db.User.update(
        {
          username: req.body.newUsername
        },
        {
          where: {
            username: req.body.currentUsername
          }
        }
      ).then(function(dbUser) {
        res.json(dbUser);
      });
    }
  })
    

});



router.put("/api/assignuser", function(req, res) {
  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update
  db.Task.update(
    {
      assignedUser: req.body.newAssignedUser
    },
    {
      where: {
        id: req.body.temporaryId
      }
    }
  ).then(function(dbTask) {
    res.json(dbTask);
  });
});
// -----endapiRoutes-----

module.exports = router;
