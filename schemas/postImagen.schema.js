const Joi = require("joi");

const postImagenSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    "string.uri": "Debe proporcionar un formato de URL válido para la imagen",
    "string.empty": "La URL de la imagen no puede estar vacía",
    "any.required": "La URL de la imagen es obligatoria",
  }),
  idPost: Joi.string().hex().length(24).required().messages({
    "string.hex": "El ID del post no tiene un formato válido",
    "string.length": "El ID del post debe tener exactamente 24 caracteres",
    "any.required": "El ID del post es obligatorio"
  })
});

module.exports = postImagenSchema;
