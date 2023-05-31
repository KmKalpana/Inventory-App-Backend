const express = require("express");
const { contactUs } = require("../controllers/contactController");
const router = express.Router();
const protect=require("../middleWare/authmiddleware")
router.post("/", protect, contactUs);

module.exports = router;