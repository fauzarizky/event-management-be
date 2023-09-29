const { body, validationResult } = require("express-validator");

// Helper function to get the current year
const getCurrentYear = () => {
  const now = new Date();
  return now.getFullYear();
};

// Custom validation function to check if at least one ticket quantity is greater than 0
const atLeastOneTicketSelected = (value, { req }) => {
  const quantityGold = req.body.quantityGold || 0;
  const quantityPlatinum = req.body.quantityPlatinum || 0;
  const quantityDiamond = req.body.quantityDiamond || 0;

  if (quantityGold > 0 || quantityPlatinum > 0 || quantityDiamond > 0) {
    return true; // At least one ticket is selected
  }

  throw new Error('No ticket selected');
};

// Custom validation function to check if the total quantity of all ticket types does not exceed 5
const maxTotalQuantity = (value, { req }) => {
  const quantityGold = req.body.quantityGold || 0;
  const quantityPlatinum = req.body.quantityPlatinum || 0;
  const quantityDiamond = req.body.quantityDiamond || 0;
  const totalQuantity = quantityGold + quantityPlatinum + quantityDiamond;

  if (totalQuantity <= 5) {
    return true; // Total quantity is within the limit
  }

  throw new Error('You cannot purchased more than 5 tickets!');
};

exports.transactionValidator = [
  // Check that at least one of the quantity fields has a non-zero value
  // (Modified validation rules)
  body('quantityGold')
    .optional()
    .isInt({ min: 0 }) // Allow 0 as a valid value
    .withMessage('Quantity Gold must be an integer greater than or equal to 0'),
  body('quantityPlatinum')
    .optional()
    .isInt({ min: 0 }) // Allow 0 as a valid value
    .withMessage('Quantity Platinum must be an integer greater than or equal to 0'),
  body('quantityDiamond')
    .optional()
    .isInt({ min: 0 }) // Allow 0 as a valid value
    .withMessage('Quantity Diamond must be an integer greater than or equal to 0'),

  // Validation for referralCode (optional)
  body('referralCode')
    .optional(),

  // Validation for couponCode (optional)
  body('couponCode')
    .optional(),

  // Validation for paymentMethod (required)
  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required')
    .custom((value, { req }) => {
      const allowedPaymentMethods = ["Credit Card", "BCA Virtual Account", "Mandiri Virtual Account", "BNI Virtual Account", "GOPAY", "OVO", "DANA"];
      if (!allowedPaymentMethods.includes(value)) {
        throw new Error('Payment method is not supported');
      }
      return true;
    }),

  // Validation for credit card details (required if paymentMethod is 'Credit Card')
  body('cardNumber')
    .if(body('paymentMethod').equals('Credit Card'))
    .isLength({ min: 16, max: 16 })
    .withMessage('Credit card number must be exactly 16 characters')
    .isNumeric()
    .withMessage('Credit card number must be numeric'),
  body('cardHolder')
    .if(body('paymentMethod').equals('Credit Card'))
    .notEmpty()
    .withMessage('Card holder name is required'),
  body('cardYear')
    .if(body('paymentMethod').equals('Credit Card'))
    .notEmpty()
    .withMessage('Card expiration year is required')
    .isInt()
    .withMessage('Invalid card expiration year')
    .custom((value, { req }) => {
      // Ensure that cardYear is not less than the current year
      const currentYear = getCurrentYear();
      if (value < currentYear) {
        throw new Error('Card expiration year cannot be in the past');
      }
      return true;
    }),
  body('cardMonth')
    .if(body('paymentMethod').equals('Credit Card'))
    .notEmpty()
    .withMessage('Card expiration month is required')
    .isInt({ min: 1, max: 12 })
    .withMessage('Invalid card expiration month'),

  // Validation for cardCvv (required if paymentMethod is 'Credit Card')
  body('cardCvv')
    .if(body('paymentMethod').equals('Credit Card'))
    .notEmpty()
    .withMessage('CVV is required')
    .isLength({ min: 3, max: 4 })
    .withMessage('Invalid CVV'),

  // Custom validation to ensure at least one ticket is selected
  body()
    .custom(atLeastOneTicketSelected),

  // Custom validation to ensure that the total selected quantity for each ticket type does not exceed 5
  body()
    .custom(maxTotalQuantity),
];

exports.applyTransactionValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    // Validation failed
    res.status(400).json({
      ok: false,
      message: "Validation data failed",
      errors: result.errors,
    });
    return;
  }
  next();
};
