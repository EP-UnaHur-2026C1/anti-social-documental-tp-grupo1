const Joi = require('joi');

const usuarioSchema = Joi.object({
    nickName: Joi.string().min(3).max(30).required().messages({
        "string.base": "El nickName debe ser un texto",
        "string.empty": "El nickName no puede estar vacío",
        "string.min": "El nickName debe tener al menos 3 caracteres",
        "any.required": "El nickName es obligatorio"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Debe ser un correo electrónico válido",
        "string.empty": "El email no puede estar vacío",
        "any.required": "El email es obligatorio"
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "La contraseña debe tener al menos 6 caracteres",
        "string.empty": "La contraseña no puede estar vacía",
        "any.required": "La contraseña es obligatoria"
    })
});

module.exports = usuarioSchema;