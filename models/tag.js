const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la etiqueta es obligatorio"],
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

tagSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
