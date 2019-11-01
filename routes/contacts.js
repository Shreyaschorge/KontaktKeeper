const express = require("express");

const router = express.Router();

// @route    '/api/contacts'
// @desc     Get all contacts
// @access   Private
router.get("/", (req, res) => {
  res.send("Get all contacts of specific user");
});

// @route    '/api/contacts'
// @desc     ADD contacts
// @access   Private
router.post("/", (req, res) => {
  res.send("Add Contact");
});

// @route    '/api/contacts/:id'
// @desc     Update contacts
// @access   Private
router.put("/:id", (req, res) => {
  res.send("Update Contact");
});

// @route    '/api/contacts/:id'
// @desc     Delete contacts
// @access   Private
router.delete("/:id", (req, res) => {
  res.send("Delete Contact");
});

module.exports = router;
