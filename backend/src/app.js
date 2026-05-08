const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
    })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Backend funcionando",
    });
});

app.use((req,res) => {
    res.status(404).json({
        messaje: "Ruta no encontrada",
    });
});

module.exports = app;