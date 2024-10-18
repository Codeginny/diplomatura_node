import { EventEmitter } from 'events';

// Usar const en lugar de let si no se va a reasignar la variable para evitar posibles errores.
const emisor = new EventEmitter();

// Validar los parámetros dentro del callback del evento para evitar errores si no se pasa un nombre.
emisor.on('saludo', (nombre) => {
    if (!nombre) {
        console.error('Nombre no proporcionado.');
        return;
    }
    console.log(`¡Hola, ${nombre}!`);
});

// Usar emisor.emit en un contexto asíncrono en la mayoría de los casos donde se esperan resultados de operaciones asíncronas.
setImmediate(() => {
    emisor.emit('saludo', 'Mundo');
});
