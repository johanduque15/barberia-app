const db = require("../config/db");

const getServices = async(req, res) => {
    try{
        const result = await db.query(
          `SELECT servicio_id, nombre, precio,
          (EXTRACT(EPOCH FROM duracion) / 60)::int AS duracion_minutos FROM servicio
          ORDER BY servicio_id ASC`
        );

        return res.status(200).json({
            services: result.rows,
        });
    }catch(error){
        console.error("Error en getServices:", error.message);

        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

module.exports = {
    getServices,
};