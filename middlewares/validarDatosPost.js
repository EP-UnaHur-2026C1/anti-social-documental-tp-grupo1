const postSchema = require("../schemas/post.schema");

const validarDatosPost = (req, res, next) => {
  const { error } = postSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errores = error.details.map((err) => err.message);
    return res.status(400).json({ errores });
  }
  next();
};

module.exports = { validarDatosPost };
