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
    postId: Joi.number().integer().required().messages({
        "any.required": "El ID del post es obligatorio"
    }),
    usuarioId: Joi.number().integer().required().messages({
        "any.required": "El ID del usuario es obligatorio"
    })
})