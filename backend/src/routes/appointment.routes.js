const express = require("express");
const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, appointmentController.createAppointment);
router.get("/my", authMiddleware, appointmentController.getMyAppointments);
router.patch("/:id/cancel", authMiddleware, appointmentController.cancelAppointment);
router.patch("/:id", authMiddleware, appointmentController.updateAppointment);

module.exports = router;