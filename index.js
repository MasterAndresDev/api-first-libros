// ============================================================
//  SERVIDOR API FIRST - REGISTRO DE LIBROS
//  Tecnologías utilizadas:
//  - Express
//  - Swagger UI
//  - express-openapi-validator
//  - YAMLJS
//
//  Este servidor carga primero la especificación OpenAPI,
//  valida todas las peticiones contra el YAML
//  y solo si son válidas permite continuar.
// ============================================================

const express = require('express');
const app = express();
const port = 3000;

const YAML = require('yamljs');
const swaggerui = require('swagger-ui-express');
const { middleware: openApiValidator } = require('express-openapi-validator');

// ============================================================
// Cargar el archivo OpenAPI (API FIRST)
// ============================================================
const openapiDocument = YAML.load('./openapi.yaml');

// Middleware para procesar JSON
app.use(express.json());

// ============================================================
// Swagger UI (documentación automática)
// Disponible en:  http://localhost:3000/docs
// ============================================================
app.use('/docs', swaggerui.serve, swaggerui.setup(openapiDocument));

// ============================================================
// Middleware de validación basado en openapi.yaml
// Aquí express-openapi-validator compara automáticamente
// el Request Body, parámetros, respuestas y estructura.
// ============================================================
app.use(
  openApiValidator({
    apiSpec: openapiDocument, // Ahora usa el documento cargado, no una ruta
    validateRequests: true,
    validateResponses: false, // Para este examen no se requiere validar respuesta
    ignorePaths: /\/docs\/.*/, // Evita validar la documentación
  })
);

// ============================================================
// POST /libros - Registrar un nuevo libro
//
// NOTA IMPORTANTE:
// TODO se valida desde openapi.yaml, aquí NO se hace validación
// manual. Si la petición no cumple el esquema, el validador
// lanzará un error automático (400 Bad Request).
// ============================================================

let libros = []; // almacenamiento en memoria (solo para el examen)
let nextId = 1;

app.post('/libros', (req, res) => {
  // Si llega aquí significa que la validación del YAML fue exitosa
  const nuevoLibro = {
    id: nextId++,
    titulo: req.body.titulo,
    clave: req.body.clave,
    autor: req.body.autor,
  };

  libros.push(nuevoLibro);

  // Respuesta 201 - CREATED
  res.status(201).json(nuevoLibro);
});

app.get('/libros/:id', (req, res) => {
  const libroId = parseInt(req.params.id);

  if (isNaN(libroId) || libroId < 1) {
    return res.status(400).json({ message: 'ID inválido', errors: [] });
  }

  const libro = libros.find(l => l.id === libroId);

  if (!libro) {
    return res.status(404).json({ message: 'Libro no encontrado', errors: [] });
  }

  res.json(libro);
});


app.put('/libros/:id', (req, res) => {
  const libroId = parseInt(req.params.id);

  if (isNaN(libroId) || libroId < 1) {
    return res.status(400).json({ message: 'ID inválido', errors: [] });
  }

  const index = libros.findIndex(l => l.id === libroId);

  if (index === -1) {
    return res.status(404).json({ message: 'Libro no encontrado', errors: [] });
  }

  // Si llegó aquí, openapi-validator ya validó los datos
  const libroActualizado = {
    id: libroId,
    titulo: req.body.titulo,
    clave: req.body.clave,
    autor: req.body.autor
  };

  libros[index] = libroActualizado;

  res.json(libroActualizado);
});

// ============================================================
// Middleware de manejo de errores
//
// Captura:
// - Errores del validador OpenAPI
// - Errores de sintaxis JSON
//
// Estructura requerida por el examen:
// {
//   message: "...",
//   errors: [ ... ]
// }
// ============================================================

app.use((err, req, res, next) => {
  console.error('Error capturado por middleware:', err);

  res.status(err.status || 400).json({
    message: err.message,
    errors: err.errors,
  });
});

// ============================================================
// Iniciar el servidor
// ============================================================
app.listen(port, () => {
  console.log(`API de Libros escuchando en http://localhost:${port}`);
});
