const { Post, PostImagen, Usuario, Tag } = require("../models")

const obtenerPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("idUsuario", "nickName")
      .populate("comentarios", "texto")
      .populate("tags", "nombre");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPost = async (req, res) => {
  const post = req.post;
  res.status(200).json(post);
};

const crearPost = async (req, res) => {
  try {
    const { texto, fecha, idUsuario, tags, imagenes } = req.body;

    const imagenesFormat = imagenes && imagenes.length > 0
      ? imagenes.map(url => ({ url }))
      : [];

    const post = await Post.create({
      texto,
      fecha,
      idUsuario,
      tags,
      imagenes: imagenesFormat
    });


    const postCreado = await Post.findById(post._id)
      .populate("idUsuario", "nickName")
      .populate("tags", "nombre");

    res.status(201).json({
      mensaje: "Post creado correctamente",
      post: postCreado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const actualizarPost = async (req, res) => {
  try {
    const { texto, tags } = req.body;
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.status(200).json({
      mensaje: "Post actualizado correctamente",
      post: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al actualizar post",
      detalle: error.message,
    });
  }
};

const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params
    const postEliminado = await Post.findByIdAndDelete(id)
    if (!postEliminado) {
      return res.status(404).json({ message: "Post no encontrado" })
    }
    res.status(200).json({ message: "Post eliminado" })
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar post" })
  }
}

module.exports = {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost
}