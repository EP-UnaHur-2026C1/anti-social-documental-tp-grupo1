const mongoose = require("mongoose");
const { Schema } = mongoose;


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
  imagenes: [{
    type: Schema.Types.ObjectId,
    ref: "PostImagen"
  }],
  comentarios: [{
    type: Schema.Types.ObjectId,
    ref: "Comentario"
  }]
});

postSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
