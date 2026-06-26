require("dotenv").config();

const express = require("express");
const conectarDB = require("../config/db");

const app = express();
const PORT = process.env.PORT || 3000;

conectarDB();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Anti Social Documental API",
      version: "1.0.0",
      description: "API para la red social Anti Social (Documental MongoDB)",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());


const usuarioRoutes = require("../routes/usuario.routes");
const postRoutes = require("../routes/post.routes");
const tagRoutes = require("../routes/tag.routes");
const postImagenRoutes = require("../routes/postimagen.routes");
const comentarioRoutes = require("../routes/comentario.routes");

app.use("/usuarios", usuarioRoutes);
app.use("/posts", postRoutes);
app.use("/tags", tagRoutes);
app.use("/postimagenes", postImagenRoutes);
app.use("/comentarios", comentarioRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "UnaHur Anti-Social Net API (Mongoose) funcionando" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});
