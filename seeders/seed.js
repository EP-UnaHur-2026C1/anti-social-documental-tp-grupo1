require("dotenv").config();
const mongoose = require("mongoose");

const Usuario = require("../models/usuario");
const Tag = require("../models/tag");
const Post = require("../models/post");
const PostImagen = require("../models/postimagen");
const Comentario = require("../models/comentario");

// Este script esta para generar datos base, asi no se nos complica testear rapido luego, porque si voy a swagger y quiero testear post, me veo obligado a crear usuarios primero :p

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    // -------------------------------------------------------------------------
    // Limpiar datos existentes (orden inverso por referencias)
    // -------------------------------------------------------------------------
    await Comentario.deleteMany({});
    await PostImagen.deleteMany({});
    await Post.deleteMany({});
    await Tag.deleteMany({});
    await Usuario.deleteMany({});
    console.log("Datos anteriores eliminados");

    // 1. Tags
    const tagTecnologia = await Tag.create({ nombre: "tecnologia" });
    const tagMusica = await Tag.create({ nombre: "musica" });
    console.log("Tags creados: tecnologia, musica");

    // 2. Usuarios
    const alice = await Usuario.create({
      nickName: "alice",
      email: "alice@test.com",
      password: "alice",
    });

    const bob = await Usuario.create({
      nickName: "bob",
      email: "bob@test.com",
      password: "bob",
    });

    // Seguirse mutuamente
    alice.seguidores.push(bob._id);
    alice.seguidos.push(bob._id);
    bob.seguidores.push(alice._id);
    bob.seguidos.push(alice._id);

    await alice.save();
    await bob.save();
    console.log("Usuarios creados: alice (alice), bob (bob) — se siguen mutuamente");

    // 3. Posts
    const postAlice = await Post.create({
      texto: "Hola mundo, me llamo Alice y estoy re lol",
      fecha: new Date(),
      idUsuario: alice._id,
      tags: [tagTecnologia._id, tagMusica._id],
    });

    const postBob = await Post.create({
      texto: "Hola me gusta el cafe",
      fecha: new Date(),
      idUsuario: bob._id,
      tags: [tagMusica._id, tagTecnologia._id],
    });
    console.log("Posts creados: 1 de alice, 1 de bob");

    // 4. PostImagenes
    const imgAlice = await PostImagen.create({
      url: "https://picsum.photos/seed/alice-tea/600/400",
      idPost: postAlice._id,
    });

    const imgBob = await PostImagen.create({
      url: "https://picsum.photos/seed/bob-coffee/600/400",
      idPost: postBob._id,
    });

    // Vincular las imagenes a los posts
    postAlice.imagenes.push(imgAlice._id);
    postBob.imagenes.push(imgBob._id);
    await postAlice.save();
    await postBob.save();
    console.log("Imagenes creadas: 1 por post");

    // 5. Comentarios
    const comentarioBob = await Comentario.create({
      texto: "Que onda Alice pasas ig?",
      fecha: new Date(),
      esVisible: true,
      idPost: postAlice._id,
      idUsuario: bob._id,
    });

    const comentarioAlice = await Comentario.create({
      texto: "No se, aguante el te",
      fecha: new Date(),
      esVisible: true,
      idPost: postBob._id,
      idUsuario: alice._id,
    });

    // Vincular los comentarios a los posts
    postAlice.comentarios.push(comentarioBob._id);
    postBob.comentarios.push(comentarioAlice._id);
    await postAlice.save();
    await postBob.save();
    console.log("Comentarios creados: bob comenta post de alice, alice comenta post de bob");

    // Resumen
    console.log("\n========================================");
    console.log("  SEED COMPLETADO EXITOSAMENTE");
    console.log("========================================");
    console.log("  Usuarios:");
    console.log("    alice / alice  (alice@test.com)");
    console.log("    bob / bob      (bob@test.com)");
    console.log("  Tags: tecnologia, musica");
    console.log("  Posts: 2 (1 por usuario)");
    console.log("  Imagenes: 2 (1 por post)");
    console.log("  Comentarios: 2 (1 por post)");
    console.log("========================================\n");
  } catch (error) {
    console.error("Error durante el seed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
};

seed();
