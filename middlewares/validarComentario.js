const comentarioSchema = require('../schemas/comentario.schema')

const validarComentario = (req, res, next) => {
    const { error } = comentarioSchema.validate(req.body)
    if(error){
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = validarComentario;