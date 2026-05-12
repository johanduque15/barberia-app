-- ==================================
-- Seed SQL - Duque´s BarberShopApp
-- Datos iniciales para pruebas 
-- Base de datos: barber_db


INSERT INTO servicio(nombre, precio, duracion)
SELECT 'Corte de pelo', 15.00, INTERVAL '30 minutes'
WHERE NOT EXISTS (
    SELECT 1 FROM servicio WHERE nombre = 'Corte de pelo'
);

INSERT INTO servicio(nombre, precio, duracion)
SELECT 'Arreglo de barba', 10.00, INTERVAL '20 minutes'
WHERE NOT EXISTS (
    SELECT 1 FROM servicio WHERE nombre = 'Arreglo de barba'
);

INSERT INTO servicio(nombre, precio, duracion)
SELECT 'Corte + barba', 22.00, INTERVAL '45 minutes'
WHERE NOT EXISTS (
    SELECT 1 FROM servicio WHERE nombre = 'Corte + barba'
);

INSERT INTO servicio(nombre, precio, duracion)
SELECT 'Afeitado clásico', 12.00, INTERVAL '25 minutes'
WHERE NOT EXISTS (
    SELECT 1 FROM servicio WHERE nombre = 'Afeitado clásico'
);

--==================================
-- Barberos iniciales

--==================================

INSERT INTO usuario (nombre, apellidos, email, password_hash, rol, movil)
SELECT 'Andres', 'Acosta', 'andres@barberia.com', 'no_login', 'barbero', '600111222'
WHERE NOT EXISTS ( SELECT 1 FROM usuario WHERE email = 'andres@barberia.com');

INSERT INTO usuario (nombre, apellidos, email, password_hash, rol, movil)
SELECT 'Jose', 'Jimenez', 'jose@barberia.com', 'no_login', 'barbero', '600222333'
WHERE NOT EXISTS ( SELECT 1 FROM usuario WHERE email = 'andres@barberia.com');

INSERT INTO usuario (nombre, apellidos, email, password_hash, rol, movil)
SELECT 'Pedro', 'Perez', 'pedro@barberia.com', 'no_login', 'barbero', '600333444'
WHERE NOT EXISTS ( SELECT 1 FROM usuario WHERE email = 'andres@barberia.com');

--=======================================
--Admin
--=======================================

UPDATE usuario SET rol = 'admin' WHERE email = 'admin@barberia.com';

--=====================
--comprobaciones
--=====================

SELECT usuario_id, nombre, apellidos, email, rol FROM usuario ORDER BY usuario_id;

SELECT servicio_id, nombre, precio, duracion FROM servicio ORDER BY servicio_id;