# Modelos de Datos - MongoDB (Mongoose)

Este documento describe la estructura en formato JSON de los documentos y la definición de esquemas de **Mongoose** que se utilizarán para **UnaHur Anti-Social Net**. Está basado en el estilo y las convenciones del código del docente (`api-productos-mongoose`) y trabajos de compañeros previos (`tp-mongo-fsociety404`).

---

## Convenciones y Buenas Prácticas de Mongoose Aplicadas
* **Uso de ObjectIds y `ref`**: Para relaciones referenciadas (`idUsuario`, `tags`), se utiliza `mongoose.Schema.Types.ObjectId` con su respectiva propiedad `ref`.
* **Subdocumentos (Embeds)**: Los comentarios (`Comentario`) y las imágenes (`PostImagen`) se modelan como sub-esquemas embebidos directamente en el esquema de `Post` para optimizar consultas de lectura y eliminación.
* **Timestamps**: Se activa `{ timestamps: true }` en colecciones principales para generar y actualizar de manera automática los campos `createdAt` y `updatedAt`.
* **Transformación toJSON**: Se configura el método `toJSON` para eliminar el campo de control `__v` que genera Mongoose por defecto, tal como se implementó en el proyecto `fsociety404`.

---

## 1. Colección: `usuarios` (Usuario)

Representa a los usuarios registrados en la plataforma. Maneja las relaciones de seguimiento ("Followers") mediante arreglos de referencias de `ObjectId` al propio modelo.

### Estructura de Documento JSON
```json
{
  "_id": "667362a2e4c16f2c88d8b101",
  "nickName": "JuanPerez",
  "email": "juanperez@gmail.com",
  "password": "hashed_password_123",
  "seguidores": [
    "667362c4e4c16f2c88d8b102",
    "667362d2e4c16f2c88d8b103"
  ],
  "seguidos": [
    "667362c4e4c16f2c88d8b102"
  ],
  "createdAt": "2026-06-20T03:00:00.000Z",
  "updatedAt": "2026-06-20T03:05:00.000Z"
}
```

### Definición de Esquema en Mongoose
```javascript
const usuarioSchema = new mongoose.Schema(
  {
    nickName: {
      type: String,
      required: [true, "El nickName es obligatorio"],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"]
    },
    seguidores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
      }
    ],
    seguidos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
      }
    ]
  },
  {
    timestamps: true
  }
);

usuarioSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});
```

---

## 2. Colección: `posts` (Post)

Publicación realizada por un usuario. Este esquema embebe los esquemas de comentarios y de imágenes. Las etiquetas (`tags`) se mantienen referenciadas.

### Estructura de Documento JSON
```json
{
  "_id": "66736340e4c16f2c88d8b105",
  "texto": "¡Hola a todos! Este es mi primer posteo.",
  "fecha": "2026-06-20T03:10:00.000Z",
  "idUsuario": "667362a2e4c16f2c88d8b101",
  "tags": [
    "667363e0e4c16f2c88d8b110"
  ],
  "imagenes": [
    {
      "_id": "66736340e4c16f2c88d8b106",
      "url": "https://servidor.com/imagenes/post1.jpg"
    }
  ],
  "comentarios": [
    {
      "_id": "6673641ce4c16f2c88d8b120",
      "texto": "¡Buenísimo el posteo, Juan!",
      "fecha": "2026-06-20T03:15:00.000Z",
      "esVisible": true,
      "idUsuario": "667362c4e4c16f2c88d8b102"
    }
  ]
}
```

### Definición de Esquemas en Mongoose (Subdocumentos y Principal)

#### Esquema de Imagen (`imagenSchema`)
```javascript
const imagenSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "La URL de la imagen es obligatoria"],
    trim: true
  }
});
```

#### Esquema de Comentario (`comentarioSchema`)
```javascript
const comentarioSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: [true, "El texto del comentario es obligatorio"],
    minlength: [5, "Debe tener al menos 5 caracteres"],
    maxlength: [500, "Debe tener como máximo 500 caracteres"],
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  esVisible: {
    type: Boolean,
    default: true
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El autor del comentario es obligatorio"]
  }
});
```

#### Esquema Principal del Post (`postSchema`)
```javascript
const postSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: [true, "El texto de la publicación es obligatorio"],
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El creador del post es obligatorio"]
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  imagenes: [imagenSchema],
  comentarios: [comentarioSchema]
});

postSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});
```

---

## 3. Colección: `tags` (Tag)

Colección independiente para etiquetas compartidas entre publicaciones.

### Estructura de Documento JSON
```json
{
  "_id": "667363e0e4c16f2c88d8b110",
  "nombre": "tecnologia",
  "createdAt": "2026-06-20T03:02:00.000Z",
  "updatedAt": "2026-06-20T03:02:00.000Z"
}
```

### Definición de Esquema en Mongoose
```javascript
const tagSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la etiqueta es obligatorio"],
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

tagSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});
```
