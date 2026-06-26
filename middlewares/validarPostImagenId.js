const { PostImagen } = require("../models")

const validarPostImagenId = async (req, res, next) => {
    try {
        const { id } = req.params
        const imagen = await PostImagen.findById(id)
        if (!imagen) {
            return res.status(404).json({ error: "Imagen no encontrada" })
        }
        req.postimagen = imagen
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { validarPostImagenId }