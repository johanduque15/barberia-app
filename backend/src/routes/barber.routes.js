const express = require("express");
const barberController = require("../controllers/barber.controller");

const router = express.Router();

router.get("/",barberController.getBarbers);

module.exports = router;