const express = require("express");
const router = express.Router();

const eventController = require("../controller/event");
const authMiddleware = require("../middleware/auth");
const { multerUpload } = require("../lib/multer");

router.get("/", eventController.getAllEvents);
router.get("/:event", eventController.getSpesificEvent);
router.get("/location/:location", eventController.getEventByLocation);
router.get("/type/:type", eventController.getEventByType);
router.get("/id/:id", eventController.getEventById);
router.post("/create", authMiddleware.validateToken, authMiddleware.checkRole, multerUpload.single("img"), eventController.handleCreateEvent);

module.exports = router;
