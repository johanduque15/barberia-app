const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const app = express();
const authRoutes = require("./routes/auth.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const serviceRoutes = require("./routes/service.routes");
const barberRoutes = require("./routes/barber.routes");
const adminRoutes = require("./routes/admin.routes");

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
    })
);

app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/admin",adminRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Backend funcionando",
    });
});

app.get("/api/db-test", async(req, res) => {
    try{
        const result = await db.query("SELECT NOW()");

        res.status(200).json({
            status: "ok",
            message: "Conexión con PostgreSQL correcta",
            database_time: result.rows[0].now,
        });
    }catch(error){
        console.error("Error al conectar con PostgreSQL:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al conectar con PostgresSQL",
        });
    }
});

module.exports = app;