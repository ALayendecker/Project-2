const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("home", { user: req.user }));
router.get("/me", (req, res) => res.render("workspace", { user: req.user }));
router.get("/register", (req, res) => res.render("home", { user: req.user }));

module.exports = router;
