export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    // Validar token (aquí podrías usar JWT, por ejemplo)
    next();
  };
  