/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - texto
 *         - idUsuario
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado del post
 *         texto:
 *           type: string
 *           description: Contenido textual de la publicacion
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha de creacion del post
 *         idUsuario:
 *           type: string
 *           description: ID del usuario creador del post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de las etiquetas asociadas
 *         imagenes:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de las imagenes asociadas
 *         comentarios:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de los comentarios del post
 *
 *     PostInput:
 *       type: object
 *       required:
 *         - texto
 *         - idUsuario
 *       properties:
 *         texto:
 *           type: string
 *           description: Contenido textual de la publicacion
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha opcional (se usa la actual si no se envía)
 *         idUsuario:
 *           type: string
 *           description: ID del usuario que crea el post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de las etiquetas a asociar (opcional)
 *         imagenes:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs de las imagenes a incluir (opcional)
 *
 * tags:
 *   name: Posts
 *   description: Operaciones relacionadas con publicaciones
 */

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

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de todas las publicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', obtenerPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtener una publicacion por su ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Datos de la publicacion solicitada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Post no encontrado
 */
router.get('/:id', validarPostId, obtenerPost);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear una nueva publicacion
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       201:
 *         description: Post creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Post creado correctamente
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Error de validacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de errores de validacion
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validarDatosPost, crearPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualizar una publicacion existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: Nuevo contenido textual
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Nuevas etiquetas a asignar
 *     responses:
 *       200:
 *         description: Post actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Post actualizado correctamente
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Error de validacion
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Post no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', validarDatosPost, validarPostId, actualizarPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Eliminar una publicacion
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post a eliminar
 *     responses:
 *       200:
 *         description: Post eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post eliminado
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Post no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', validarPostId, eliminarPost);

module.exports = router;