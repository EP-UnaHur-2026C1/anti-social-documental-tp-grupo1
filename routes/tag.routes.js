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

router.post("/", validarTag, crearTag);
router.get("/", obtenerTodosLosTags);
router.get("/:id", validarTagExiste, obtenerTagPorId);
router.put("/:id", validarTagExiste, validarTag, actualizarTag);
router.delete("/:id", validarTagExiste, eliminarTag);

module.exports = router;