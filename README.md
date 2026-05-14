# Sistema de reservas para barbería

Aplicación web desarrollada como Proyecto Final de Ciclo de Desarrollo de Aplicaciones Web.

El proyecto consiste en un sistema de reservas para una barbería. Permite que los clientes puedan registrarse, iniciar sesión, consultar servicios y barberos, reservar una cita, consultar sus reservas, modificarlas o cancelarlas. También incluye un panel de administración para gestionar citas, servicios y barberos.

## Tecnologías utilizadas

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- JWT
- bcrypt
- pg

### Base de datos

- PostgreSQL

### Herramientas de desarrollo

- Visual Studio Code
- Warp
- Git
- GitHub
- Postman
- pgAdmin

## Funcionalidades principales

### Cliente

- Registro de usuario.
- Inicio de sesión.
- Consulta de servicios.
- Consulta de barberos.
- Reserva de citas.
- Consulta de citas propias.
- Modificación de citas.
- Cancelación de citas.

### Administrador

- Consulta de todas las citas.
- Cambio de estado de citas.
- Gestión de servicios.
- Gestión de barberos.

## Requisitos previos

Antes de ejecutar el proyecto en local es necesario tener instalado:

- Node.js
- PostgreSQL
- Git
- pgAdmin

## Instalación del proyecto

Clonar el repositorio:

```bash
git clone https://github.com/johanduque15/barberia-app.git
```

Entrar en la carpeta del proyecto:

```bash
cd barberia-app
```

## Configuración de la base de datos desde pgAdmin

El proyecto utiliza una base de datos PostgreSQL llamada:

```text
barber_db
```

### 1. Crear la base de datos

1. Abrir pgAdmin.
2. Conectarse al servidor local de PostgreSQL.
3. Abrir el `Query Tool` sobre la base de datos por defecto, por ejemplo `postgres`.
4. Ejecutar el siguiente script:

```sql
CREATE DATABASE barber_db;
```

Después de crear la base de datos, seleccionar `barber_db` en pgAdmin y abrir un nuevo `Query Tool` sobre esa base de datos.

### 2. Crear las tablas

Ejecutar el siguiente script dentro de la base de datos `barber_db`:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE usuario (
    usuario_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150),
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'cliente',
    movil VARCHAR(20),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (rol IN ('cliente', 'barbero', 'admin'))
);

CREATE TABLE servicio (
    servicio_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(6,2) NOT NULL,
    duracion INTEGER NOT NULL,

    CHECK (precio >= 0),
    CHECK (duracion > 0)
);

CREATE TABLE cita (
    cita_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    barbero_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    servicio_id INTEGER NOT NULL,
    duracion INTEGER NOT NULL,

    FOREIGN KEY (barbero_id) REFERENCES usuario(usuario_id),
    FOREIGN KEY (cliente_id) REFERENCES usuario(usuario_id),
    FOREIGN KEY (servicio_id) REFERENCES servicio(servicio_id),

    CHECK (estado IN ('pendiente', 'confirmada', 'cancelada', 'completada')),
    CHECK (duracion > 0)
);

CREATE TABLE horario (
    horario_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dia_semana INTEGER NOT NULL,
    hora_entrada TIME NOT NULL,
    hora_salida TIME NOT NULL,
    barbero_id INTEGER NOT NULL,

    FOREIGN KEY (barbero_id) REFERENCES usuario(usuario_id),

    CHECK (hora_salida > hora_entrada),
    CHECK (dia_semana BETWEEN 1 AND 7)
);
```

### 3. Insertar datos iniciales

Ejecutar el siguiente script dentro de la base de datos `barber_db`:

```sql
INSERT INTO usuario (nombre, apellidos, email, password_hash, rol, movil)
VALUES
('Admin', 'Principal', 'admin@barberia.com', crypt('Admin1234', gen_salt('bf')), 'admin', '600000000'),
('Andres', 'Acosta', 'andres@barberia.com', crypt('Barbero1234', gen_salt('bf')), 'barbero', '600000001'),
('Jose', 'Jimenez', 'jose@barberia.com', crypt('Barbero1234', gen_salt('bf')), 'barbero', '600000002'),
('Pedro', 'Perez', 'pedro@barberia.com', crypt('Barbero1234', gen_salt('bf')), 'barbero', '600000003');

INSERT INTO servicio (nombre, precio, duracion)
VALUES
('Corte de pelo', 12.00, 30),
('Arreglo de barba', 8.00, 20),
('Corte + barba', 18.00, 45),
('Afeitado clásico', 10.00, 30);

INSERT INTO horario (dia_semana, hora_entrada, hora_salida, barbero_id)
SELECT 1, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'andres@barberia.com'
UNION ALL
SELECT 2, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'andres@barberia.com'
UNION ALL
SELECT 3, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'andres@barberia.com'
UNION ALL
SELECT 4, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'andres@barberia.com'
UNION ALL
SELECT 5, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'andres@barberia.com'
UNION ALL
SELECT 6, '10:00', '14:00', usuario_id FROM usuario WHERE email = 'andres@barberia.com'

UNION ALL
SELECT 1, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'jose@barberia.com'
UNION ALL
SELECT 2, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'jose@barberia.com'
UNION ALL
SELECT 3, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'jose@barberia.com'
UNION ALL
SELECT 4, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'jose@barberia.com'
UNION ALL
SELECT 5, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'jose@barberia.com'
UNION ALL
SELECT 6, '10:00', '14:00', usuario_id FROM usuario WHERE email = 'jose@barberia.com'

UNION ALL
SELECT 1, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'pedro@barberia.com'
UNION ALL
SELECT 2, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'pedro@barberia.com'
UNION ALL
SELECT 3, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'pedro@barberia.com'
UNION ALL
SELECT 4, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'pedro@barberia.com'
UNION ALL
SELECT 5, '10:00', '20:00', usuario_id FROM usuario WHERE email = 'pedro@barberia.com'
UNION ALL
SELECT 6, '10:00', '14:00', usuario_id FROM usuario WHERE email = 'pedro@barberia.com';
```

### 4. Comprobar los datos insertados

Para comprobar que las tablas se han creado correctamente, se pueden ejecutar estas consultas desde pgAdmin:

```sql
SELECT * FROM usuario;
SELECT * FROM servicio;
SELECT * FROM horario;
SELECT * FROM cita;
```

## Usuario administrador de prueba

Para acceder al panel de administración se puede utilizar el siguiente usuario:

```text
Email: admin@barberia.com
Contraseña: 123456
```

Estas credenciales son únicamente para probar el proyecto en entorno local.

## Variables de entorno del backend

Crear un archivo `.env` dentro de la carpeta del backend.

Ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=barber_db
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD_DE_POSTGRESQL
JWT_SECRET=clave_secreta_para_jwt
```

> El archivo `.env` real no debe subirse al repositorio. Para documentar las variables necesarias se puede incluir un archivo `.env.example`.

## Instalación y ejecución del backend

Entrar en la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor:

```bash
npm run dev
```

El backend se ejecutará normalmente en:

```text
http://localhost:3000
```

## Instalación y ejecución del frontend

Abrir otra terminal:


Instalar dependencias:

```bash
npm install
```

Ejecutar el frontend:

```bash
npm run dev
```

El frontend se ejecutará normalmente en:

```text
http://localhost:5173
```

## Endpoints principales

### Autenticación

```text
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

### Citas de usuario

```text
POST /api/appointments
GET /api/appointments/my
PATCH /api/appointments/:id
PATCH /api/appointments/:id/cancel
```

### Servicios públicos

```text
GET /api/services
```

### Barberos públicos

```text
GET /api/barbers
```

### Administración

```text
GET /api/admin/appointments
PATCH /api/admin/appointments/:id/status

GET /api/admin/services
POST /api/admin/services
PATCH /api/admin/services/:id

GET /api/admin/barbers
POST /api/admin/barbers
PATCH /api/admin/barbers/:id
```

## Validaciones implementadas

- No se puede reservar sin estar autenticado.
- El cliente de la cita se obtiene desde el token JWT.
- No se pueden reservar fechas anteriores al día actual.
- No se pueden reservar citas con más de 90 días de antelación.
- Los sábados solo se permiten reservas antes de las 14:00.
- No se permite doble reserva para el mismo barbero en la misma fecha y hora.
- No se puede modificar una cita cancelada.
- No se puede cancelar dos veces la misma cita.
- Las rutas de administración requieren rol `admin`.
- Las contraseñas se almacenan hasheadas con bcrypt.

## Estructura general del proyecto

```text
barberia-app/
  src/
    components/
    context/
    hooks/
    pages/
    services/

backend/
  src/
    controllers/
    middlewares/
    routes/
    db/
```

La estructura puede variar ligeramente según la organización final del proyecto.

## Autor

Johan Duque Guerrero

Proyecto Final de Ciclo  
Desarrollo de Aplicaciones Web
