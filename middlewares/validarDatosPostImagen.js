const postImagenSchema = require("../schemas/postimagen.schema");

const validarDatosPostImagen = (req, res, next) => {
  const { error } = postImagenSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errores = error.details.map((err) => err.message);
    return res.status(400).json({ errores });
  }
  next();
};

module.exports = { validarDatosPostImagen };