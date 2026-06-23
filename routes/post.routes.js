const { Router } = require('express');
const {
  obtenerPost,
  obtenerPosts,
  crearPost,
  actualizarPost,
  eliminarPost } = require('../controllers/post.controllers');

const { validarDatosPost } = require('../middlewares/validarDatosPost');
const { validarPostId } = require('../middlewares/validarPostId');

const router = Router();

router.get('/', obtenerPosts);
router.get('/:id', validarPostId, obtenerPost);
router.post('/', validarDatosPost, crearPost);
router.put('/:id', validarDatosPost, validarPostId, actualizarPost);
router.delete('/:id', validarPostId, eliminarPost);

module.exports = router;