const usuarioSchema = require('../schemas/usuario.schema');

const validarUsuario = (req, res, next) => {
    const { error } = usuarioSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errores = error.details.map(err => err.message);
        return res.status(400).json({ errores });
    }
    next();
};

module.exports = { validarUsuario };