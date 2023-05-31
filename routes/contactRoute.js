const express = require("express");
const { contactUs } = require("../controllers/contactController");
const router = express.Router();
const protect=require("../middleWare/authmiddleWare")
router.post("/", protect, contactUs);

module.exports = router;