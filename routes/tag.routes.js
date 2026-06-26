/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado del tag
 *         nombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Nombre unico de la etiqueta
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creacion
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de ultima actualizacion
 *
 *     TagInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Nombre de la etiqueta a crear
 *
 * tags:
 *   name: Tags
 *   description: Operaciones relacionadas con etiquetas
 */

const express = require("express");
const router = express.Router();

const {
  crearTag,
  obtenerTodosLosTags,
  obtenerTagPorId,
  actualizarTag,
  eliminarTag,
} = require("../controllers/tag.controllers");

const { validarTagExiste } = require("../middlewares/validarTagExiste");
const { validarTag } = require("../middlewares/validarDatosTag");

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Crear una nueva etiqueta
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagInput'
 *     responses:
 *       201:
 *         description: Tag creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Error de validacion - datos invalidos o nombre duplicado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al crear el tag
 *                 error:
 *                   type: string
 *
 *   get:
 *     summary: Obtener todas las etiquetas
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Lista de todas las etiquetas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", validarTag, crearTag);
router.get("/", obtenerTodosLosTags);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Obtener una etiqueta por su ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tag
 *     responses:
 *       200:
 *         description: Nombre de la etiqueta solicitada
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Tag no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Tag no encontrado
 *
 *   put:
 *     summary: Actualizar una etiqueta existente
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tag a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagInput'
 *     responses:
 *       200:
 *         description: Tag actualizado con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Tag actualizado con exito
 *                 tag:
 *                   $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Error de validacion
 *       404:
 *         description: Tag no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Eliminar una etiqueta
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tag a eliminar
 *     responses:
 *       200:
 *         description: Tag eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Tag eliminado correctamente
 *       404:
 *         description: Tag no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", validarTagExiste, obtenerTagPorId);
router.put("/:id", validarTagExiste, validarTag, actualizarTag);
router.delete("/:id", validarTagExiste, eliminarTag);

module.exports = router;