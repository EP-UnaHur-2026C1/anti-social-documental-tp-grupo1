const mongoose = require("mongoose");

const postImagenSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret
        }
    }
  }
);

module.exports = mongoose.model("PostImagen", postImagenSchema);