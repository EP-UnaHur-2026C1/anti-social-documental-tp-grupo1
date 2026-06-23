const { Comentario, Usuario, Post } = require("../models")

const obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.find()
            .populate("idUsuario", "nickName")
            .populate("idPost", "texto")
            .select("-createdAt -updatedAt -__v");
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los comentarios",
            error: error.message,
        });
    }
}

const obtenerComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await Comentario.findById(id)
            .populate("idUsuario", "nickName")
            .populate("idPost", "texto")
            .select("-createdAt -updatedAt -__v");
        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el comentario",
            error: error.message,
        });
    }
}

const crearComentario = async (req, res) => {
    try {
        const { texto, fecha, esVisible, idPost, idUsuario } = req.body;
        const comentario = await Comentario.create({
            texto,
            fecha,
            esVisible,
            idPost,
            idUsuario
        });
        res.status(201).json(comentario);
    } catch (error) {
        res.status(500).json({
            error: "Error al crear comentario",
        });
    }
}

const actualizarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await Comentario.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el comentario",
        })
    }
}

const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentarioEliminado = await Comentario.findByIdAndDelete(id);
        if (!comentarioEliminado) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.status(200).json({ message: "Comentario eliminado con exito!!!" });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el comentario",
            error: error.message,
        });
    }
}

const cambiarVisibilidad = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await Comentario.findByIdAndUpdate(id, {
            esVisible: false,
        });
        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.status(200).json({
            message: "El comentario ya no es visible.",
        })
    } catch (error) {
        res.status(500).json({
            error: "Error al cambiar la visibilidad del comentario.",
        })
    }
}

module.exports = {
    obtenerComentarios,
    obtenerComentario,
    crearComentario,
    actualizarComentario,
    eliminarComentario,
    cambiarVisibilidad
}