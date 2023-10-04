const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const transactionController = require("../controller/transaction");
const transactionValidator = require("../middleware/validation/transaction");

router.post("/:eventId", authMiddleware.validateToken, authMiddleware.checkRoleUser, transactionValidator.transactionValidator, transactionValidator.applyTransactionValidation, transactionController.handleCreateTransaction);
router.post("/:transactionId/pay", authMiddleware.validateToken, authMiddleware.checkRoleUser, transactionController.handlePayTicket)
module.exports = router;
