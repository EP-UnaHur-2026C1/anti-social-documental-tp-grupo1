const mongoose = require("mongoose");
const { Schema } = mongoose;

const imagenSchema = new Schema({
  url: {
    type: String,
    required: [true, "La URL de la imagen es obligatoria"],
    trim: true
  }
});

const comentarioSchema = new Schema({
  texto: {
    type: String,
    required: [true, "El texto del comentario es obligatorio"],
    minlength: [5, "Debe tener al menos 5 caracteres"],
    maxlength: [500, "Debe tener como máximo 500 caracteres"],
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
  }
});

const postSchema = new Schema({
  texto: {
    type: String,
    required: [true, "El texto de la publicación es obligatorio"],
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El creador del post es obligatorio"]
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  imagenes: [imagenSchema],
  comentarios: [comentarioSchema]
});

postSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
