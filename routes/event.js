const express = require("express")
const router = express.Router()

const eventController = require("../controller/event")
const {multerUpload} = require("../lib/multer")

router.get("/", eventController.getAllEvents)
router.post("/create", eventController.handleCreateEvent, multerUpload.single("img"))