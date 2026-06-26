const { Usuario } = require("../models");

const crearUsuario = async (req, res) => {
  try {
    const { nickName, email, password } = req.body;
    const nuevoUsuario = await Usuario.create({ nickName, email, password });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al crear el usuario", error: error.message });
  }
};

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener usuarios", error: error.message });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  const usuario = req.usuario;
  res.status(200).json(usuario);
};

const actualizarUsuario = async (req, res) => {
  try {
    const { nickName, email, password } = req.body;
    const usuario = req.usuario;

    if (nickName !== undefined) usuario.nickName = nickName;
    if (email !== undefined) usuario.email = email;
    if (password !== undefined) usuario.password = password;
    await usuario.save();

    res.status(200).json({ mensaje: "Usuario actualizado con éxito", usuario });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al actualizar usuario", error: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = req.usuario;
    usuario.deletedAt = new Date();
    await usuario.save();
    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar usuario", error: error.message });
  }
};

const seguirUsuario = async (req, res) => {
  try {
    const usuario = req.usuario;
    const { usuarioId } = req.body;

    if (usuarioId === usuario._id.toString()) {
      return res.status(400).json({ mensaje: "No puedes seguirte a ti mismo" });
    }

    const usuarioASeguir = await Usuario.findById(usuarioId);
    if (!usuarioASeguir) {
      return res.status(404).json({ mensaje: "El usuario a seguir no existe" });
    }

    if (!usuario.seguidos.includes(usuarioId)) {
      usuario.seguidos.push(usuarioId);
      await usuario.save();
    }

    if (!usuarioASeguir.seguidores.includes(usuario._id)) {
      usuarioASeguir.seguidores.push(usuario._id);
      await usuarioASeguir.save();
    }

    res.status(200).json({ mensaje: "Usuario seguido correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al seguir usuario",
      error: error.message,
    });
  }
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  seguirUsuario,
};