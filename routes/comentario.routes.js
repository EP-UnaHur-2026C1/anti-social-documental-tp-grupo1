const { Router } = require('express');
const {
  obtenerComentario,
  obtenerComentarios,
  crearComentario,
  actualizarComentario,
  cambiarVisibilidad,
  eliminarComentario } = require('../controllers/comentario.controllers');

const validarComentario = require("../middlewares/validarComentario");
const validarAntiguedad = require("../middlewares/validarAntiguedad");
const {
  validarComentarioIdConPostYUsuario,
  validarComentarioId,
} = require("../middlewares/validarComentarioId")

const router = Router();

router.get('/', obtenerComentarios);
router.get('/:id', validarComentarioIdConPostYUsuario, obtenerComentario);
router.post('/', validarComentario, crearComentario);
router.put('/:id', validarComentario, validarComentarioId, actualizarComentario);
router.patch('/:id/visibilidad', validarComentarioId, validarAntiguedad, cambiarVisibilidad);
router.delete('/:id', validarComentarioId, eliminarComentario);

module.exports = router;