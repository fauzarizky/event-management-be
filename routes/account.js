const express = require("express");
const router = express.Router();

const authController = require("../controller/account");


router.post(
  "/register", 
authValidator.registerValidationRules,
authValidator.applyRegisterValidation,
 authController.handleRegister
 );

router.post("/", authController.handleLogin);
router.patch(
  "/login",
  authMiddleware.validateToken,
  authController.updateAccount
);


module.exports = router;
