# Modelos de Datos - MongoDB (Mongoose)

Este documento describe la estructura en formato JSON de los documentos y la definición de esquemas de **Mongoose** que se utilizarán para **UnaHur Anti-Social Net**. Está basado en el estilo y las convenciones del código del docente (`api-productos-mongoose`) y trabajos de compañeros previos (`tp-mongo-fsociety404`).

---

## Convenciones y Buenas Prácticas de Mongoose Aplicadas
* **Uso de ObjectIds y `ref`**: Para relaciones referenciadas (`idUsuario`, `tags`), se utiliza `mongoose.Schema.Types.ObjectId` con su respectiva propiedad `ref`.
* **Relaciones referenciadas**: Todas las relaciones entre colecciones (`idUsuario`, `tags`, `imagenes`, `comentarios`, `idPost`) se modelan mediante `ObjectId` con `ref`, manteniendo los documentos en colecciones separadas para favorecer la independencia y escalabilidad.
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
  "deletedAt": null,
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
    ],
    deletedAt: {
      type: Date,
      default: null
    }
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

// Soft-delete: filtrar documentos eliminados en consultas
usuarioSchema.pre("find", function () {
  this.where({ deletedAt: null });
});
usuarioSchema.pre("findOne", function () {
  this.where({ deletedAt: null });
});
usuarioSchema.pre("countDocuments", function () {
  this.where({ deletedAt: null });
});
```

---

## 2. Colección: `posts` (Post)

Publicación realizada por un usuario. Las imágenes, comentarios y etiquetas se almacenan en colecciones separadas y se relacionan mediante referencias (`ObjectId`).

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
    "66736340e4c16f2c88d8b106"
  ],
  "comentarios": [
    "6673641ce4c16f2c88d8b120"
  ]
}
```

### Definición de Esquema en Mongoose
```javascript
const postSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El creador del post es obligatorio"]
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  imagenes: [{
    type: Schema.Types.ObjectId,
    ref: "PostImagen"
  }],
  comentarios: [{
    type: Schema.Types.ObjectId,
    ref: "Comentario"
  }]
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

---

## 4. Colección: `postimagenes` (PostImagen)

Imagen asociada a una publicación. Se almacena en una colección independiente y se referencia desde el post mediante `ObjectId`.

### Estructura de Documento JSON
```json
{
  "id": "66736340e4c16f2c88d8b106",
  "url": "https://servidor.com/imagenes/post1.jpg",
  "idPost": "66736340e4c16f2c88d8b105",
  "createdAt": "2026-06-20T03:10:00.000Z",
  "updatedAt": "2026-06-20T03:10:00.000Z"
}
```

Nota: el campo `_id` se transforma a `id` en la respuesta JSON (ver `toJSON`).

### Definición de Esquema en Mongoose
```javascript
const postImagenSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    idPost: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
```

---

## 5. Colección: `comentarios` (Comentario)

Comentario que un usuario realiza sobre una publicación. Se almacena en una colección independiente con referencia al usuario autor y al post asociado.

### Estructura de Documento JSON
```json
{
  "_id": "6673641ce4c16f2c88d8b120",
  "texto": "¡Buenísimo el posteo, Juan!",
  "fecha": "2026-06-20T03:15:00.000Z",
  "esVisible": true,
  "idUsuario": "667362c4e4c16f2c88d8b102",
  "idPost": "66736340e4c16f2c88d8b105"
}
```

### Definición de Esquema en Mongoose
```javascript
const comentarioSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El autor del comentario es obligatorio"]
  },
  idPost: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "El post al que pertenece el comentario es obligatorio"]
  }
});

comentarioSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});
```
```
