const Joi = require('joi').extend(require('@joi/date'));

const comentarioSchema = Joi.object({
    texto: Joi.string()
        .min(5)
        .max(500)
        .required()
        .messages({
            "string.base": "El comentario debe ser texto",
            "string.empty": "El texto es obligatorio",
            "string.min": "El texto debe tener al menos 5 caractéres",
            "string.max": "El texto debe tener máximo 500 caractéres",
            "any.required": "El texto es obligatorio"
        }),
    fecha: Joi.date().iso().required(),
    esVisible: Joi.boolean().default(true),
    idPost: Joi.string().hex().length(24).required().messages({
        "any.required": "El ID del post es obligatorio",
        "string.hex": "El ID del post no tiene un formato válido"
    }),
    idUsuario: Joi.string().hex().length(24).required().messages({
        "any.required": "El ID del usuario es obligatorio",
        "string.hex": "El ID del usuario no tiene un formato válido"
    })
})

module.exports = comentarioSchema;