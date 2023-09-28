const { body, validationResult } = require("express-validator");

// Helper function to get the current year
const getCurrentYear = () => {
    const now = new Date();
    return now.getFullYear();
  };

  const allowedPaymentMethods = ["Credit Card", "BCA Virtual Account", "Mandiri Virtual Account", "BNI Virtual Account", "GOPAY", "OVO", "DANA"];

const createTransactionValidator = [
    // Check that at least one of the quantity fields has a non-zero value
    body('quantityGold')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Quantity Gold must be an integer greater than 0'),
    body('quantityPlatinum')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Quantity Platinum must be an integer greater than 0'),
    body('quantityDiamond')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Quantity Diamond must be an integer greater than 0'),

    // Validation for referralCode (optional)
    body('referralCode')
        .optional()
        .isAlphanumeric()
        .withMessage('Referral code must be alphanumeric'),

    // Validation for couponCode (optional)
    body('couponCode')
        .optional()
        .isAlphanumeric()
        .withMessage('Coupon code must be alphanumeric'),

    // Validation for paymentMethod (required)
    
    body('paymentMethod')
        .notEmpty()
        .withMessage('Payment method is required')
        .custom((value, { req }) => {
            if (!allowedPaymentMethods.includes(value)) {
                throw new Error('Payment method is not supported');
            }
            return true;
        }),

    // Validation for credit card details (required if paymentMethod is 'Credit Card')

    body('cardNumber')
        .if(body('paymentMethod').equals('Credit Card'))
        .notEmpty()
        .withMessage('Card number is required')
        .isCreditCard()
        .withMessage('Invalid credit card number'),
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