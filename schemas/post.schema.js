const Joi = require("joi");

const postSchema = Joi.object({
    texto: Joi.string().min(1).required().messages({
        "string.empty": "La descripción del post no puede estar vacía",
        "any.required": "La descripción del post es obligatoria",
    }),
    tags: Joi.array()
    .items(Joi.string().hex().length(24).messages({
        "string.empty": "Los tags no pueden estar vacíos",
        "string.hex": "El formato del tag no es un ObjectId válido",
        "string.length": "El ID del tag debe tener exactamente 24 caracteres"
    }))
    .optional(),

    fecha: Joi.string().optional(),
    idUsuario: Joi.string().hex().length(24).required().messages({
        "any.required": "El ID del usuario es obligatorio",
        "string.hex": "El ID del usuario no tiene un formato válido"
    }),
    imagenes: Joi.array()
        .items(Joi.string().uri().messages({
            "string.uri": "Cada imagen debe ser una URL válida",
        }))
        .optional(),
});

module.exports = postSchema;