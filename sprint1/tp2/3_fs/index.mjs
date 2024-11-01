import fs from 'fs';

// Leer un archivo de manera asíncrona
// Añadir manejo de errores más detallado y un mensaje descriptivo en caso de error. 
// Esto facilita la depuración en aplicaciones más grandes.
fs.readFile('./data/example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return; // Es mejor evitar que el programa continúe si hay un error.
    }
    console.log('Contenido del archivo:', data);
});

// Escribir un nuevo archivo
// Agregar manejo de errores más detallado y comentarios que describen mejor la operación.
// Además, incluir la opción de establecer permisos en caso de que sea necesario.
fs.writeFile('./data/newfile.txt', 'Contenido nuevo', (err) => {
    if (err) {
        console.error('Error al escribir el archivo:', err);
        return;
    }
    console.log('Archivo creado y escrito exitosamente');
});

// Renombrar un archivo
// Es mejor el uso de manejo de errores más descriptivo y verificar si el archivo existe antes de 
// renrenombrarlo para evitar errores innecesarios.
fs.rename('./data/newfile.txt', './data/renamedfile.txt', (err) => {
    if (err) {
        console.error('Error al renombrar el archivo:', err);
        return;
    }
    console.log('Archivo renombrado exitosamente');
});
