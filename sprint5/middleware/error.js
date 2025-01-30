export function errorMiddleware(err, req, res, next) {
    console.error(err.stack);  // Esto sigue mostrando el error en la consola

    // Si el error es de validación, devuelve el mensaje de error
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    // Si el error es por la base de datos o cualquier otro tipo, lo detectamos y lo mostramos
    res.status(500).json({
        message: 'Algo salió mal, por favor intenta más tarde.',
        error: err.message,   // Aquí se agrega el mensaje de error
        stack: err.stack      // También puedes incluir el stack para más detalles
    });
}
