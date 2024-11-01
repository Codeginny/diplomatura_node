import path from 'path';

// Definir una ruta de archivo de ejemplo
const filePath = './data/example.txt';

// Convertir a ruta absoluta (mejor práctica para trabajar con rutas)
const absoluteFilePath = path.resolve(filePath);

// Obtener el directorio base
const dirName = path.dirname(absoluteFilePath);
console.log(`Directorio base: ${dirName}`);

// Obtener el nombre del archivo sin extensión
const baseName = path.basename(absoluteFilePath, '.txt');
console.log(`Nombre del archivo sin extensión: ${baseName}`);

// Obtener la extensión del archivo
const extName = path.extname(absoluteFilePath);
console.log(`Extensión del archivo: ${extName}`);

// Crear una nueva ruta unida
const newPath = path.join('/user', 'docs', 'newfile.txt');
console.log(`Nueva ruta: ${newPath}`);