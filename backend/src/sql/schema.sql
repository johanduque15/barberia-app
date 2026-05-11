
CREATE TABLE IF NOT EXISTS usuario (
    usuario_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    rol TEXT NOT NULL CHECK (rol IN ('cliente','barbero',admin)),
    movil TEXT NOT NULL,
    fecha_creacion TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servicio (
    servicio_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre TEXT NOT NULL,
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
    duracion INTERVAL NOT NULL
);

CREATE TABLE IF NOT EXISTS cita (
    cita_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME WITHOUT TIME ZONE NOT NULL,
    estado TEXT NOT NULL DEFAULT 'pendiente'
        CHECK(estado IN ('pendiente','confirmada','cancelada','completada')),
    barbero_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    servicio_id INTEGER NOT NULL,
    duracion INTERVAL NOT NULL,

    CONSTRAINT fk_cita_barbero FOREIGN KEY (barbero_id) REFERENCES usuario (usuario_id),
    CONSTRAINT fk_cita_cliente FOREIGN KEY (cliente_id) REFERENCES usuario (usuario_id),
    CONSTRAINT fk_cita_servicio FOREIGN KEY (servicio_id) REFERENCES servicio (servicio_id),
    CONSTRAINT unique_cita_barber_fecha_hora UNIQUE (barbero_id, fecha, hora)
);

CREATE TABLE IF NOT EXISTS horario (
    horario_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dia_semana INTEGER NOT NULL CHECK (dia_semana BETWEEN 1 AND 7),
    hora_entrada TIME WITHOUT TIME ZONE NOT NULL,
    hora_salida TIME WITHOUT TIME ZONE NOT NULL,
    barbero_id INTEGER NOT NULL,

    CONSTRAINT fk_horario_barbero FOREIGN KEY (barbero_id) REFERENCES usuario(usuario_id),
    CONSTRAINT check_horario_horas CHECK (hora_salida > hora_entrada)
);
