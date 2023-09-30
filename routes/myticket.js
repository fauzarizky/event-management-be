const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const myTicketController = require("../controller/myticket");

router.get("/", authMiddleware.validateToken, authMiddleware.checkRoleUser, myTicketController.handleGetMyTicket)

module.exports = router;