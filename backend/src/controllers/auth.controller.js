const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const generateToken = (user) => {
    return jwt.sign(
        {
            usuario_id: user.usuario_id,
            email: user.email,
            rol: user.rol,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    );
};

const register = async (req, res) => {
    try{
        const {nombre, apellidos, email, password, movil} = req.body;

        if(!nombre || !apellidos || !email || !password || !movil){
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        const existingUser = await db.query(
            "SELECT usuario_id FROM usuario WHERE email = $1",
            [email]
        );

        if(existingUser.rows.length > 0){
            return res.status(400).json({
                message: "El email ya está registrado",
            });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password,saltRounds);

        const result = await db.query(
            `INSERT INTO usuario
                (nombre, apellidos, email, password_hash, rol, movil)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING usuario_id, nombre, apellidos, email, rol, movil, fecha_creacion`,
                [nombre, apellidos, email, passwordHash, "cliente", movil]
        );

        const user = result.rows[0];
        const token = generateToken(user);

        res.status(201).json({
            message: "Usuario registrado correctamente",
            token,
            user,
        });
    }catch(error){
        console.error("Error en registro", error.message);

        res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

const login = async (req, res) => {
    try{
        const {email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Email y contraseña obligatorios",
            });
        }

        const result = await db.query(
            `SELECT usuario_id, nombre, apellidos, email, password_hash, rol, movil 
                FROM usuario WHERE email = $1`, [email]
        );

        if(result.rows.length === 0){
            return res.status(401).json({
                message: "Credenciales incorrectas",
            });
        }

        const user = result.rows[0];

        const passwordIsValid = await bcrypt.compare(password, user.password_hash);

        if(!passwordIsValid){
            return res.status(401).json({
                message: "Credenciales incorrectas",
            });
        }

        const token = generateToken(user);
        delete user.password_hash;

        res.status(200).json({
            message: "Login correcto",
            token,
            user,
        });
    }catch(error){
        console.error("Error en login", error.message);

        res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

const getMe = async (req, res) => {
    try{
        const result = await db.query(
            `SELECT usuario_id, nombre, apellidos, email, rol, movil, fecha_creacion 
                FROM usuario WHERE usuario_id = $1`, [req.user.usuario_id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        res.status(200).json({
            user: result.rows[0],
        });
    }catch(error){
        console.error("Error en getMe:", error.message);

        res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

module.exports = {
    register,
    login,
    getMe,
};