const express = require("express");
const router = new express.Router();
const RegistrationFormUser = require("../models/registrationSchema");
const cors = require('cors');

// Enable CORS for all routes
router.use(cors({
  origin: "*",
}));

router.post('/registration', async (req, res) => {
  console.log(req.body);
  const { name, fathersName, mothersName, dob, gender, course, standard, phone, email } = req.body;

  if (!name || !fathersName || !mothersName || !gender || !course || !standard || !phone || !email) {
    return res.status(400).send("WARNING: Please enter all the required fields first!");
  }

  try {
    const registrationFormUser = new RegistrationFormUser({ name, mothersName, fathersName, dob, gender, course, standard, phone, email });
    await registrationFormUser.save();
    return res.status(201).send("Registered successfully, we'll get back to you soon!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
