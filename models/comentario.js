const mongoose = require("mongoose");
const { Schema } = mongoose;

const comentarioSchema = new Schema({
  texto: {
    type: String,
    required: [true, "El texto del comentario es obligatorio"],
    minlength: [5, "Debe tener al menos 5 caracteres"],
    maxlength: [500, "Debe tener como máximo 500 caracteres"],
    deletedAt: { type: Date, default: null },
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  esVisible: {
    type: Boolean,
    default: true
  },
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El autor del comentario es obligatorio"]
  },
  idPost: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "El post al que pertenece el comentario es obligatorio"]
  }
});

comentarioSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});

const Comentario = mongoose.model("Comentario", comentarioSchema);
module.exports = Comentario;