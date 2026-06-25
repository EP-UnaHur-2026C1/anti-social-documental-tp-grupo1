/**
 * @swagger
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       required:
 *         - texto
 *         - idPost
 *         - idUsuario
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado del comentario
 *         texto:
 *           type: string
 *           minLength: 5
 *           maxLength: 500
 *           description: Contenido del comentario
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha de creacion del comentario
 *         esVisible:
 *           type: boolean
 *           default: true
 *           description: Indica si el comentario es visible
 *         idUsuario:
 *           type: string
 *           description: ID del autor del comentario
 *         idPost:
 *           type: string
 *           description: ID del post al que pertenece el comentario
 *
 *     ComentarioInput:
 *       type: object
 *       required:
 *         - texto
 *         - idPost
 *         - idUsuario
 *       properties:
 *         texto:
 *           type: string
 *           minLength: 5
 *           maxLength: 500
 *           description: Contenido del comentario
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha del comentario (formato ISO)
 *         esVisible:
 *           type: boolean
 *           default: true
 *           description: Visibilidad inicial del comentario
 *         idPost:
 *           type: string
 *           description: ID del post al que pertenece
 *         idUsuario:
 *           type: string
 *           description: ID del usuario que comenta
 *
 *     VisibilidadInput:
 *       type: object
 *       properties:
 *         esVisible:
 *           type: boolean
 *           description: Nuevo estado de visibilidad
 *
 * tags:
 *   name: Comentarios
 *   description: Operaciones relacionadas con comentarios de publicaciones
 */

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

/**
 * @swagger
 * /comentarios:
 *   get:
 *     summary: Obtener todos los comentarios
 *     tags: [Comentarios]
 *     responses:
 *       200:
 *         description: Lista de todos los comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       500:
 *         description: Error interno del servidor
 *
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentarioInput'
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Error de validacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', obtenerComentarios);
router.post('/', validarComentario, crearComentario);

/**
 * @swagger
 * /comentarios/{id}:
 *   get:
 *     summary: Obtener un comentario por su ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Datos del comentario solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       404:
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comentario no encontrado
 *
 *   put:
 *     summary: Actualizar un comentario existente
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentarioInput'
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Error de validacion
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a eliminar
 *     responses:
 *       200:
 *         description: Comentario eliminado con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comentario eliminado con exito!!!
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', validarComentarioIdConPostYUsuario, obtenerComentario);
router.put('/:id', validarComentario, validarComentarioId, actualizarComentario);
router.delete('/:id', validarComentarioId, eliminarComentario);

/**
 * @swagger
 * /comentarios/{id}/visibilidad:
 *   patch:
 *     summary: Cambiar la visibilidad de un comentario (ocultar por antiguedad)
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Visibilidad cambiada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El comentario ya no es visible.
 *       400:
 *         description: El comentario no cumple la antiguedad requerida o ya esta oculto
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/visibilidad', validarComentarioId, validarAntiguedad, cambiarVisibilidad);

module.exports = router;