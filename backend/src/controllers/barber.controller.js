const db = require("../config/db");

const getBarbers = async(req, res) => {
    try{
        const result = await db.query(
      `SELECT usuario_id AS barbero_id, nombre, apellidos FROM usuario WHERE rol = 'barbero'
       ORDER BY nombre ASC`
        );

        return res.status(200).json({
            barbers: result.rows,
        });
    }catch(error){
        console.error("Error en getBarbers:", error.message);

        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

module.exports = {
    getBarbers,
};