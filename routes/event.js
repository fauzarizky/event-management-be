const express = require("express");
const router = express.Router();

const eventController = require("../controller/event");
const authMiddlewere = require("../middleware/auth");
const { multerUpload } = require("../lib/multer");

router.get("/", eventController.getAllEvents);
router.get("/:event", eventController.getSpesificEvent);
router.get("/location/:location", eventController.getEventByLocation);
router.post("/create", multerUpload.single("img") ,eventController.handleCreateEvent);

module.exports = router;
