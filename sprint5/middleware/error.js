// Exportar el middleware de error como una exportación nombrada
export function errorMiddleware(err, req, res, next) {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    res.status(500).send('Algo salió mal, por favor intenta más tarde.');
}
