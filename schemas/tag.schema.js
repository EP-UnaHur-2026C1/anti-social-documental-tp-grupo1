const Joi = require('joi');

const tagSchema = Joi.object({
    nombre: Joi.string().min(2).max(50).required().messages({
        "string.base": "El nombre del tag debe ser un texto",
        "string.empty": "El nombre del tag no puede estar vacío",
        "any.required": "El nombre del tag es obligatorio"
    })
});

module.exports = tagSchema;