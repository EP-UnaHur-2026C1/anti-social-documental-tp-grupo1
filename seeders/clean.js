require("dotenv").config();
const mongoose = require("mongoose");

// Este limpia todo, asi podemos limpiar seeders y seguir testeando

const clean = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    const collections = await mongoose.connection.db.listCollections().toArray();
    const nombres = collections.map((c) => c.name);

    if (nombres.length === 0) {
      console.log("La base de datos ya esta vacia.");
      process.exit(0);
    }

    for (const nombre of nombres) {
      await mongoose.connection.db.dropCollection(nombre);
      console.log(`  Eliminada: ${nombre}`);
    }

    console.log("Base de datos limpiada por completo.");
  } catch (error) {
    console.error("Error al limpiar la base de datos:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
};

clean();
