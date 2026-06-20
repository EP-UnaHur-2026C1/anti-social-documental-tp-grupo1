const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    nickName: {
      type: String,
      required: [true, "El nickName es obligatorio"],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"]
    },
    seguidores: [
      {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
      }
    ],
    seguidos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
      }
    ]
  },
  {
    timestamps: true
  }
);

usuarioSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;
