const db = require("../config/db");

const getAllAppointments = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT c.cita_id, c.fecha, c.hora, c.estado, c.duracion, s.nombre AS servicio, s.precio,
             cliente.usuario_id AS cliente_id, cliente.nombre AS cliente_nombre,
             cliente.apellidos AS cliente_apellidos,cliente.email AS cliente_email,
             barbero.usuario_id AS barbero_id, barbero.nombre AS barbero_nombre, 
             barbero.apellidos AS barbero_apellidos FROM cita c
             INNER JOIN servicio s ON c.servicio_id = s.servicio_id
             INNER JOIN usuario cliente ON c.cliente_id = cliente.usuario_id
             INNER JOIN usuario barbero ON c.barbero_id = barbero.usuario_id
             ORDER BY c.fecha ASC, c.hora ASC`
        );

        return res.status(200).json({
            appointments: result.rows,
        });
    } catch (error) {
        console.error("Error en getAllAppointments:", error.message);

        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const validStatuses = ["pendiente", "confirmada", "cancelada", "completada"];

        if (!estado) {
            return res.status(400).json({
                message: "El estado es obligatorio",
            });
        }

        if (!validStatuses.includes(estado)) {
            return res.status(400).json({
                message: "Estado no valido",
            });
        }

        const result = await db.query(
            `UPDATE cita SET estado = $1 WHERE cita_id = $2
            RETURNING cita_id, fecha, hora, estado, barbero_id, cliente_id, servicio_id, duracion`,
            [estado, id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Cita no encontrada",
            });
        }

        return res.status(200).json({
            message: "Estado de la cita actualizado correctamente",
            appointment: result.rows[0],
        });
    }catch(error){
        console.error("Error en updateAppointment;", error.message);

        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

const getAdminServices = async(req, res) => {
    try{
        const result = await db.query(
            `SELECT servicio_id, nombre, precio,
            (EXTRACT(EPOCH FROM duracion) / 60)::int AS duracion_minutos
            FROM servicio ORDER BY servicio_id ASC`
        );

        return res.status(200).json({
            services: result.rows,
        });
    }catch(error){
        console.error("Error en getAdminServices:", error.message);

        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

const createService = async(req, res) => {
    try{
        const {nombre, precio, duracion_minutos} = req.body;

        if(!nombre || precio === undefined || !duracion_minutos){
            return res.status(400).json({
                message: "Nombre, precio y duración son obligatorios",
            });
        }

        const result = await db.query(
            `INSERT INTO servicio (nombre, precio, duracion)
             VALUES ($1, $2, ($3::text || ' minutes')::interval)
             RETURNING servicio_id, nombre, precio,
             (EXTRACT(EPOCH FROM duracion) / 60)::int AS duracion_minutos`,
             [nombre, precio, duracion_minutos]
        );

        return res.status(201).json({
            message: "Servicio creado correctamente",
            service: result.rows[0],
        });
    }catch(error){
        console.error("Error en createService:", error.message);

        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

const updateService = async(req, res) => {
    try{
        const {id} = req.params;
        const {nombre, precio, duracion_minutos} = req.body;

        if(!nombre || precio === undefined || !duracion_minutos){
            return res.status(400).json({
                message: "Nombre, precio y duración son obligatorios",
            });
        }

        const result = await db.query(
            `UPDATE servicio SET nombre = $1, precio = $2, duracion = ($3::text || ' minutes')::interval
             WHERE servicio_id = $4 RETURNING servicio_id, nombre, precio,
             (EXTRACT(EPOCH FROM duracion) / 60)::int AS duracion_minutos`,
             [nombre, precio, duracion_minutos, id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Servicio no encontrado",
            });
        }

        return res.status(200).json({
            message: "Servicio actualizado correctamente",
            service: result.rows[0],
        });
    }catch(error){
        console.error("Error en updateService:", error.message);

        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

const getAdminBarbers = async(req, res) => {
    try{
        const result = await db.query(
            `SELECT usuario_id AS barbero_id, nombre, apellidos, email, movil
             FROM usuario WHERE rol = 'barbero' ORDER BY usuario_id ASC`,
        );

        return res.status(200).json({
            barbers: result.rows,
        });
    }catch(error){
        console.error("Error en getAdminBarbers:", error.message);

        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

const createBarber = async(req, res) => {
    try{
        const{ nombre, apellidos, email, movil} = req.body;

        if(!nombre || !apellidos || !email || !movil){
            return res.status(400).json({
                message:"Nombre, apellidos, email y movil son obligatorios",
            });
        }

        const existingUser = await db.query(
            `SELECT usuario_id FROM usuario WHERE email = $1`, [email]
        );

        if(existingUser.rows.length > 0){
            return res.status(409).json({
                message: "Ya existe un usuario con ese email",
            });
        }

        const result = await db.query(
        `INSERT INTO usuario (nombre, apellidos, email, password_hash, rol, movil)
         VALUES ($1, $2, $3, $4, 'barbero', $5)
         RETURNING usuario_id AS barbero_id, nombre, apellidos, email, movil`,
         [nombre, apellidos, email, "no_login", movil]
        );

        return res.status(201).json({
            message: "Barbero creado correctamente",
            barber: result.rows[0],
        });
    }catch(error){
        console.error("Error en createBarber:", error.message),

        res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

const updateBarber = async(req, res) => {
    try{
        const {id} = req.params;
        const {nombre, apellidos, email, movil} = req.body;

        if(!nombre || !apellidos || !email || !movil){
            return res.status(400).json({
                message: "Nombre, apellidos, mail y movil son obligatorios",
            });
        }

        const result = await db.query(
            `UPDATE usuario SET nombre = $1, apellidos = $2, email = $3, movil = $4
             WHERE usuario_id = $5 AND rol = 'barbero'
             RETURNING usuario_id AS barbero_id, nombre, apellidos, email, movil`,
             [nombre, apellidos, email, movil, id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Barbero no encontrado",
            });
        }

        return res.status(200).json({
            message: "Barbero actualizado correctamente",
            barber: result.rows[0],
        });
    }catch(error){
        console.error("Error en updateBarber:", error.message);

        if(error.code === "23505"){
            return res.status(409).json({
                message: "Ya existe un usuario con ese email",
            });
        }

        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

module.exports = {
    getAllAppointments,
    updateAppointmentStatus,
    getAdminServices,
    createService,
    updateService,
    getAdminBarbers,
    createBarber,
    updateBarber,
};