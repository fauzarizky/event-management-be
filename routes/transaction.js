const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/auth");

const transactionController = require("../controller/transaction")

router.post(
    "/:eventId",
    authMiddleware.validateToken, transactionController.handleCreateTransaction
  );

module.exports = router;