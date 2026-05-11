const db = require("../config/db");

const createAppointment = async (req, res) => {
    try {
        const { fecha, hora, barbero_id, servicio_id } = req.body;
        const cliente_id = req.user.usuario_id;

        if (!fecha || !hora || !barbero_id || !servicio_id) {
            return res.status(400).json({
                message: "Fecha, hora, barbero y servicio son obligatorios",
            });
        }

        const barberResult = await db.query(
            `SELECT usuario_id FROM usuario WHERE usuario_id = $1 AND rol = 'barbero'`, [barbero_id]
        );

        if (barberResult.rows.length === 0) {
            return res.status(404).json({
                message: "Barbero no encontrado",
            });
        }

        const serviceResult = await db.query(
            `SELECT servicio_id, duracion FROM servicio WHERE servicio_id = $1`, [servicio_id]
        );

        if (serviceResult.rows.lenght === 0) {
            return res.status(404).json({
                message: "Servicio no encontrado",
            });
        }

        const existingAppointment = await db.query(
            `SELECT cita_id FROM cita WHERE barbero_id = $1 AND fecha = $2 AND hora = $3 
                AND estado <> 'cancelada'`, [barbero_id, fecha, hora]
        );

        if (existingAppointment.rows.length > 0) {
            return res.status(409).json({
                message: "El barbero ya tiene una cita en esa fecha y hora",
            });
        }

        const duracion = serviceResult.rows[0].duracion;

        const result = await db.query(
            `INSERT INTO cita (fecha, hora, estado, barbero_id, cliente_id, servicio_id, duracion)
            VALUES ($1, $2, 'pendiente', $3, $4, $5, $6) RETURNING cita_id, fecha, hora,
            estado, barbero_id, cliente_id, servicio_id, duracion`, [fecha, hora, barbero_id,
            cliente_id, servicio_id, duracion]
        );

        return res.status(201).json({
            message: "Cita creada correctamente",
            appointment: result.rows[0],
        });
    } catch (error) {
        console.error("Error en createAppointment:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                message: "Ya existe una cita para ese barbero en esa fecha y hora",
            });
        }

        return res.status(500).json({
            message: "Ya existe una cita para ese barbero en esa fecha y hora",
        });
    }
};


    const getMyAppointments = async (req, res) => {
        try {
            const cliente_id = req.user.usuario_id;

            const result = await db.query(
                `SELECT 
                c.cita_id, c.fecha, c.hora, c.estado, c.duracion, s.nombre AS servicio, s.precio,
                b.usuario_id AS barbero_id, b.nombre AS barbero_nombre, b.apellidos AS barbero_apellidos
                FROM cita c
                INNER JOIN servicio s ON c.servicio_id = s.servicio_id
                INNER JOIN usuario b ON c.barbero_id = b.usuario_id
                WHERE c.cliente_id = $1
                ORDER BY c.fecha ASC, c.hora ASC`, [cliente_id]
            );

            return res.status(200).json({
                appintment: result.rows,
            });
        } catch (error) {
            console.error("Error en getMyAppointments:", error.message);

            return res.status(500).json({
                message: "Error interno del servidor",
            });
        }
    };

    const updateAppointment = async (req, res) => {
        try {
            const { id } = req.params;
            const { fecha, hora, barbero_id, servicio_id } = req.body;
            const cliente_id = req.user.usuario_id;

            if (!fecha || !hora || !barbero_id || !servicio_id) {
                return res.status(400).json({
                    message: "Fecha, hora, barbero y servicio son obligatorios",
                });
            }

            const appointmentResult = await db.query(
                `SELECT cita_id, estado FROM cita WHERE cita_id = $1 AND cliente_id = $2`,
                [id, cliente_id]
            );

            if (appointmentResult.rows.length === 0) {
                return res.status(404).json({
                    message: "Cita no encontrada",
                });
            }

            if (appointmentResult.rows[0].estado === "cancelada") {
                return res.status(400).json({
                    message: "No se puede modificar una cita cancelada",
                });
            }

            const barberResult = await db.query(
                `SELECT usuario_id FROM usuario WHERE usuario_id = $1 AND rol = 'barbero'`,
                [barbero_id]
            );

            if (barberResult.rows.length === 0) {
                return res.status(404).json({
                    message: "Barbero no encontrado",
                });
            }

            const serviceResult = await db.query(
                `SELECT servicio_id, duracion FROM servicio WHERE servicio_id = $1`,
                [servicio_id]
            );

            if (serviceResult.rows.length === 0) {
                return res.status(404).json({
                    message: "Servicio no encontrado",
                });
            }

            const existingAppointment = await db.query(
                `SELECT cita_id FROM cita WHERE barbero_id = $1 AND fecha = $2
                AND hora = $3 AND estado <> 'cancelada' AND cita_id <> $4`,
                [barbero_id, fecha, hora, id]
            );

            if (existingAppointment.rows.length > 0) {
                return res.status(409).json({
                    message: "El barbero ya tiene una cita en esa fecha y hora",
                });
            }

            const duracion = serviceResult.rows[0].duracion;

            const result = await db.query(
                `UPDATE cita
                 SET fecha = $1, hora = $2,barbero_id = $3, servicio_id = $4, duracion = $5
                 WHERE cita_id = $6 AND cliente_id = $7
                 RETURNING cita_id, fecha, hora, estado, barbero_id, cliente_id, servicio_id, duracion`,
                 [fecha, hora, barbero_id, servicio_id, duracion, id, cliente_id]
            );

            return res.status(200).json({
                message: "Cita actualizada correctamente",
                appointment: result.rows[0],
            });
        }catch(error){
            console.error("Error en updateAppointment:", error.message);

            if(error.code === "23505"){
                return res.status(409).json({
                    message: "Ya existe una cita para ese barbero en esa fecha y hora",
                });
            }

            return res.status(500).json({
                message: "Error interno del servidor",
            });
        }
    };

    const cancelAppointment = async(req, res) => {
        try{
            const {id} = req.params;
            const cliente_id = req.user.usuario_id;

            const result = await db.query(
                `UPDATE cita SET estado = 'cancelada' WHERE cita_id = $1 AND cliente_id = $2
                 AND estado <> 'cancelada'
                 RETURNING cita_id, fecha, hora, estado, barbero_id, cliente_id, servicio_id, duracion`,
                 [id, cliente_id]
            );

            if(result.rows.length === 0){
                return res.status(404).json({
                    message: "Cita no encontrada o ya cancelada",
                });
            }

            return res.status(200).json({
                message: "Cita cancelada correctamente",
                appointment: result.rows[0],
            });
        }catch(error){
            console.error("Error en cancelAppointment:", error.message);

            return res.status(500).json({
                message: "Error interno del servidor",
            });
        }
    };

    module.exports = {
        createAppointment,
        getMyAppointments,
        updateAppointment,
        cancelAppointment,
    }
