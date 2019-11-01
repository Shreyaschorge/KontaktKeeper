const express = require("express");

const router = express.Router();

// @route    '/api/auth'
// @desc     Get logged in user
// @access   Private
router.get("/", (req, res) => {
  res.send("Get the auth user");
});

// @route    '/api/auth'
// @desc     auth user and get a token
// @access   Public
router.post("/", (req, res) => {
  res.send("Log in User");
});

module.exports = router;
