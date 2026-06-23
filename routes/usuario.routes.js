/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nickName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del usuario
 *         nickName:
 *           type: string
 *           description: Nombre de usuario único
 *           minLength: 3
 *           maxLength: 30
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario (mínimo 6 caracteres)
 *           minLength: 6
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Fecha de eliminación suave
 *
 *     SeguirInput:
 *       type: object
 *       required:
 *         - usuarioId
 *       properties:
 *         usuarioId:
 *           type: integer
 *           description: ID del usuario a seguir
 *
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con usuarios
 */

const express = require("express");
const router = express.Router();

const {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  // seguirUsuario
} = require("../controllers/usuario.controllers");

const { validarUsuarioExiste } = require("../middlewares/validarUsuarioExiste");
const { validarUsuario } = require("../middlewares/validarDatosUsuario");
// const { validarSeguir } = require("../middlewares/validarSeguir");
const { validarObjectId } = require("../middlewares/validarObjectId");

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickName
 *               - email
 *               - password
 *             properties:
 *               nickName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 description: Nombre de usuario único
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación - datos inválidos o usuario duplicado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de errores de validación
 *
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", validarUsuario, crearUsuario);
router.get("/", obtenerTodosLosUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario no encontrado
 *
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 description: Nuevo nombre de usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Nuevo correo electrónico
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Nueva contraseña
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario actualizado con éxito
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Usuario no encontrado
 *
 *   delete:
 *     summary: Eliminar un usuario (eliminación suave)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", validarObjectId(), validarUsuarioExiste, obtenerUsuarioPorId);
router.put("/:id", validarObjectId(), validarUsuarioExiste, validarUsuario, actualizarUsuario);
router.delete("/:id", validarObjectId(), validarUsuarioExiste, eliminarUsuario);

/**
 * @swagger
 * /usuarios/{id}/seguir:
 *   post:
 *     summary: Seguir a otro usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario que va a seguir
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeguirInput'
 *     responses:
 *       200:
 *         description: Usuario seguido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario seguido correctamente
 *       400:
 *         description: No puedes seguirte a ti mismo o error de validación
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/:id/seguir", validarObjectId(), validarUsuarioExiste);

module.exports = router;
