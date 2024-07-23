const express = require("express");
const passport = require("passport");
const { Register,Login, googleLogin } = require("../controllers/auth");
const { body } = require("express-validator");

const router = express.Router();

// Signup route
router.post(
  "/register",
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  Register
);

//Signin route
router.post("/login", Login);



router.post(
  "/google/callback",
  googleLogin
);

// Logout route
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;
