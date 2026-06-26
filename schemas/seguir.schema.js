const Joi = require("joi");

const seguirSchema = Joi.object({
  usuarioId: Joi.string().hex().length(24).required().messages({
    "string.hex": "El ID del usuario a seguir no tiene un formato válido",
    "string.length": "El ID del usuario a seguir debe tener exactamente 24 caracteres",
    "any.required": "El ID del usuario a seguir es obligatorio",
  }),
});

module.exports = seguirSchema;
