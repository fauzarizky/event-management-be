const express = require("express");
const router = express.Router();

const authController = require("../controller/account");
const authMiddleware = require("../middleware/auth");
const authValidator = require("../middleware/validation/auth");


router.post(
  "/register", 
authValidator.registerValidationRules,
authValidator.applyRegisterValidation,
 authController.handleRegister
 );

 router.post("/", authController.handleLogin);
 router.patch(
   "/account",
   authMiddleware.validateToken
 );


module.exports = router;
