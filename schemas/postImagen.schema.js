const Joi = require("joi");

const postImagenSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    "string.uri": "Debe proporcionar un formato de URL válido para la imagen",
    "string.empty": "La URL de la imagen no puede estar vacía",
    "any.required": "La URL de la imagen es obligatoria",
  }),
  idPost: Joi.number().integer().required().messages({
    "any.required": "El ID del post asociado es obligatorio",
  }),
});

module.exports = postImagenSchema;
