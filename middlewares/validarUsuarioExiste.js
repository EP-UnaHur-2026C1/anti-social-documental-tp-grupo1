const { Usuario } = require('../models');

const validarUsuarioExiste = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        req.usuario = usuario; 
        
        next(); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno al buscar usuario', error: error.message });
    }
};

module.exports = { validarUsuarioExiste };