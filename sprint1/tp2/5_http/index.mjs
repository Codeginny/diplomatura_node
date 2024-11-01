import http from 'http';

// Usar una constante para el puerto y la dirección IP, ya que permite reutilizar y cambiar fácilmente estos valores.
const PORT = 3000;
const HOST = '127.0.0.1';

// Verificar las rutas en el servidor, así el código puede manejar múltiples rutas y no limitarse a una sola respuesta.
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/') {
        res.end('¡Hola, soy Agustin!');
    } else {
        res.statusCode = 404;
        res.end('Página no encontrada');
    }
});

// Es mejor manejar errores en el evento 'listen' del servidor para saber si ocurre algún problema al intentar levantarlo.
server.listen(PORT, HOST, () => {
    console.log(`El Servidor está corriendo en http://${HOST}:${PORT}`);
}).on('error', (err) => {
    console.error('Error al iniciar el servidor:', err.message);
});
