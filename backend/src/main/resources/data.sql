/*CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'USER',
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);
*/
INSERT INTO usuarios (nombre, correo, contrasena) VALUES
('Juan Ramirez', 'correo@example.com', '1234'),
('María López', 'maria@example.com', 'abcd');
