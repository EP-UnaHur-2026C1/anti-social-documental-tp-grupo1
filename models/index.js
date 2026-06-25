const mongoose = require("mongoose");

const Usuario = require("./usuario");
const Tag = require("./tag");
const Post = require("./post");
const Comentario = require("./comentario");
const PostImagen = require("./postimagen");

module.exports = {
  Usuario,
  Tag,
  Post,
  Comentario,
  PostImagen,
};
