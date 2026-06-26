const seguirSchema = require("../schemas/seguir.schema");

const validarSeguir = (req, res, next) => {
  const { error } = seguirSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validarSeguir };
