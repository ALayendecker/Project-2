require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var exphbs = require("express-handlebars");
var customAuthMiddleware = require("./middleware/custom-auth-middleware");

// controller imports
var userController = require("./controllers/user-controller");
var viewsController = require("./controllers/views-controller");

// directory references
var clientDir = path.join(__dirname, "../client");

// set up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use the cookie-parser to help with auth token,
// it must come before the customAuthMiddleware
app.use(cookieParser());
app.use(customAuthMiddleware);

// serve up the public folder so we can request static
// assets from our html document
app.use("/assets", express.static(clientDir));

// set up handlebars
app.set("views", path.join(__dirname, "/views"));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    extname: ".handlebars",
    layoutsDir: "server/views/layouts"
  })
);
app.set("view engine", "handlebars");

// hook up our controllers
app.use(userController);
app.use(viewsController);

// Requiring our models for syncing
const db = require("./models/index");

// sync our sequelize models and then start server
db.sequelize.sync().then(() => {
  // inside our db sync callback, we start the server.
  // this is our way of making sure the server is not listening
  // to requests if we have not yet made a db connection
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
