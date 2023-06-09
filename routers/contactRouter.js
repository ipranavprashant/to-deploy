const express = require("express");
const router = new express.Router();
const ContactFormUser = require("../models/contactSchema");
const cors = require('cors');

// Enable CORS for all routes
router.use(cors({
  origin: "*",
}));

router.post('/message-me', async (req, res) => {
  console.log(req.body);
  const { name, phone, email, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).send("WARNING: Please enter all the required fields first!");
  }

  try {
    const contactFormUser = new ContactFormUser({ name, phone, email, message });
    await contactFormUser.save();
    return res.status(201).send("Message sent successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
