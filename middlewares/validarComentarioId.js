const { Comentario, Post, Usuario } = require('../models')

const validarComentarioIdConPostYUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comentario = await Comentario.findById(id)
            .populate("idUsuario", "nickName")
            .populate("idPost", "texto")
            .select("-createdAt -updatedAt -__v");
        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        req.comentario = comentario
        next()
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el comentario"
        })
    }
}

const validarComentarioId = async (req, res, next) => {
    try {
        const { id } = req.params
        const comentario = await Comentario.findById(id)
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        req.comentario = comentario
        next()
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el comentario"
        })
    }
}

module.exports =
{
    validarComentarioIdConPostYUsuario,
    validarComentarioId
}