const mongoose = require("mongoose");

const validarObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: `El ID '${paramName}' tiene un formato invalido` });
    }
    next();
  };
};

module.exports = { validarObjectId };
