const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Token no proporcionado",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            usuario_id: decoded.usuario_id,
            mail: decoded.email,
            rol: decoded.rol,
        };

        next();
    }catch(error){
        return res.status(401).json({
            message: "Token invalido o expirado",
        });
    }
};

module.exports = authMiddleware;