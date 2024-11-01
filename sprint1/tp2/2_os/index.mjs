import os from 'os';

// Usar template literals para mejorar la legibilidad y evitar concatenaciones de cadenas.
console.log(`Arquitectura: ${os.arch()}`); 

// Agregar manejo de posibles errores si se usan en contextos que no soporten estas llamadas (aunque no es común que fallen).
// En aplicaciones más grandes, sería bueno manejar estos datos con bloques try-catch en caso de que se extienda a contextos 
// que no son más complejos.
console.log(`Plataforma: ${os.platform()}`);

// Formatear la memoria en gigabytes para que la salida sea más fácil de entender para el usuario.
// totalmem() devuelve la memoria en bytes, así que la convertimos a gigabytes.
const totalMemoryGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
console.log(`Memoria total: ${totalMemoryGB} GB`);

// Formateamos la memoria libre en gigabytes para consistencia con la memoria total.
const freeMemoryGB = (os.freemem() / (1024 ** 3)).toFixed(2);
console.log(`Memoria libre: ${freeMemoryGB} GB`);

// Mostrar información simplificada de la CPU.
// `os.cpus()` devuelve un array con información detallada de cada núcleo, pero podríamos mostrar solo el 
// número de núcleos y la velocidad.
const cpuInfo = os.cpus();
console.log(`Número de núcleos: ${cpuInfo.length}`);
console.log(`Velocidad de los CPUs: ${cpuInfo[0].speed} MHz`);
