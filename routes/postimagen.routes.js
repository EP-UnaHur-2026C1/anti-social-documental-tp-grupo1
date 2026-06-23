/**
 * @swagger
 * components:
 *   schemas:
 *     PostImagen:
 *       type: object
 *       required:
 *         - url
 *         - idPost
 *       properties:
 *         idImagen:
 *           type: integer
 *           description: ID autogenerado de la imagen
 *         url:
 *           type: string
 *           format: uri
 *           description: URL de la imagen
 *         idPost:
 *           type: integer
 *           description: ID del post al que pertenece la imagen
 *
 *     PostImagenInput:
 *       type: object
 *       required:
 *         - url
 *         - idPost
 *       properties:
 *         url:
 *           type: string
 *           format: uri
 *           description: URL de la imagen
 *         idPost:
 *           type: integer
 *           description: ID del post asociado
 *
 * tags:
 *   name: PostImágenes
 *   description: Operaciones relacionadas con imágenes de publicaciones
 */

const express = require("express");
const router = express.Router();

const {
  crearPostImagen,
  obtenerPostImagenes,
  obtenerPostImagen,
  eliminarPostImagen,
} = require("../controllers/postimagen.controllers");

const { validarPostImagenId } = require("../middlewares/validarPostImagenId");
const { validarDatosPostImagen } = require("../middlewares/validarDatosPostImagen");

/**
 * @swagger
 * /postimagenes:
 *   post:
 *     summary: Agregar una imagen a una publicación
 *     tags: [PostImágenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostImagenInput'
 *     responses:
 *       201:
 *         description: Imagen creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostImagen'
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Obtener todas las imágenes
 *     tags: [PostImágenes]
 *     responses:
 *       200:
 *         description: Lista de todas las imágenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostImagen'
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", validarDatosPostImagen, crearPostImagen);
router.get("/", obtenerPostImagenes);

/**
 * @swagger
 * /postimagenes/{id}:
 *   get:
 *     summary: Obtener una imagen por su ID
 *     tags: [PostImágenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la imagen
 *     responses:
 *       200:
 *         description: Datos de la imagen solicitada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostImagen'
 *       404:
 *         description: Imagen no encontrada
 *
 *   delete:
 *     summary: Eliminar una imagen
 *     tags: [PostImágenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la imagen a eliminar
 *     responses:
 *       200:
 *         description: Imagen eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Imagen eliminada
 *       404:
 *         description: Imagen no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", validarPostImagenId, obtenerPostImagen);
router.delete("/:id", validarPostImagenId, eliminarPostImagen);

module.exports = router;
