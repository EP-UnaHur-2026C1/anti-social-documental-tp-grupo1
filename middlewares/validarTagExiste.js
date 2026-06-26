const { Tag } = require('../models');

const validarTagExiste = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findById(id);

        if (!tag) {
            return res.status(404).json({ mensaje: 'Tag no encontrado' });
        }

        req.tag = tag;
        
        next();
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno al buscar el tag', error: error.message });
    }
};

module.exports = { validarTagExiste };