const {body, validationResult} = require("express-validator");

exports.registerValidationRules = [
    body("username")
    .isLength({min: 5,max: 20})
    .withMessage("username must be 5-20 characters"),
    body("email").isEmail().withMessage("email must be valid"),
    body("phoneNumber")
    .isMobilePhone("id-ID")
    .withMessage("phone number must be valid"),
    body("password")
    .notEmpty().isStrongPassword({
      minSymbols: 0,
      minNumbers: 0,
    })
    .withMessage("password must be at least 8 characters"),
    body("firstName").optional().isLength({ 
      min: 3,
      max: 20,
    })
    .withMessage("first name must be 3-20 characters"),
    body("lastName").optional().isLength({ 
      min: 3,
      max: 20,
    })
    .withMessage("last name must be 3-20 characters"),
]

exports.applyRegisterValidation =
[(req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      //ini validasi gagal
      res.status(400).json({
        ok: false,
        message: "failed data validation",
        errors: result.errors,
      });
      return;
    }
    next();
    }]