const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../model/User");
const Contact = require("../model/Contact");

const router = express.Router();

// @route    '/api/contacts'
// @desc     Get all contacts
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    '/api/contacts'
// @desc     ADD contacts
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

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
