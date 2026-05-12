const express = require("express");
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");

const router = express.Router();

router.use(authMiddleware);
router.use(requireRole("admin"));

router.get("/appointments", adminController.getAllAppointments);
router.patch("/appointments/:id/status", adminController.updateAppointmentStatus);

router.get("/services", adminController.getAdminServices);
router.post("/services", adminController.createService);
router.patch("/services/:id", adminController.updateService);

router.get("/barbers", adminController.getAdminBarbers);
router.post("/barbers", adminController.createBarber);
router.patch("/barbers/:id", adminController.updateBarber);

module.exports = router;