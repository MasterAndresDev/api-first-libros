📘 README.md – API First: Registro de Libros

# 📚 API First – Registro de Libros

Proyecto de examen – Unidad 5  
Implementación de una API REST utilizando el enfoque **API First**, validación automática con **express-openapi-validator** y documentación generada con **Swagger UI**.

---

## 🚀 Objetivo del Proyecto

Desarrollar una API REST para **registrar libros** asegurando:

- La especificación OpenAPI es creada **antes** del código (API First).
- Las solicitudes se validan automáticamente contra el archivo `openapi.yaml`.
- La documentación se genera de manera automática mediante Swagger UI.
- El servidor retorna correctamente los estados **201 (Created)** y **400 (Bad Request)** según el resultado de la validación.

Este proyecto cumple exactamente con los criterios de evaluación del examen de la Unidad 5.

---

## 📂 Estructura del Proyecto

proyecto-libros/
│
├── index.js # Servidor Express + Validación + Swagger
├── openapi.yaml # Especificación API First
├── package.json
└── README.md

---

## 🛠️ Instalación y Configuración

Ejecuta los siguientes comandos dentro de la carpeta del proyecto:

```bash
1️⃣ Inicializar proyecto
npm init -y

2️⃣ Instalar dependencias esenciales
npm install express swagger-ui-express yamljs express-openapi-validator

3️⃣ (Opcional) Instalar nodemon para desarrollo
npm install --save-dev nodemon


Agregar al package.json:

"scripts": {
  "start": "nodemon index.js"
}

▶️ Ejecución del Proyecto

Para iniciar el servidor:

npm start


Luego abre tu navegador en:

http://localhost:3000/docs


Allí verás la documentación Swagger generada automáticamente desde tu openapi.yaml.

📌 Endpoint Principal
📘 POST /libros

Registra un nuevo libro aplicando todas las reglas de validación definidas en el archivo OpenAPI.

✔️ Request Body (JSON esperado)
{
  "titulo": "Introducción a las APIs",
  "clave": "ABCD1234",
  "autor": "Carlos Ruiz"
}

🔍 Reglas de Validación (definidas en openapi.yaml)
Campo	Regla
titulo	requerido, minLength: 5
clave	requerido, exactamente 8 caracteres
autor	requerido, minLength: 3
✔️ Respuestas Correctas
💠 201 – Created (Registro exitoso)
{
  "id": 1,
  "titulo": "Introducción a las APIs",
  "clave": "ABCD1234",
  "autor": "Carlos Ruiz"
}

❌ 400 – Bad Request (Validación incorrecta)

Ejemplo de error por campo faltante:

{
  "message": "request.body should have required property 'titulo'",
  "errors": [
    { "path": ".titulo", "message": "is a required property" }
  ]
}


Este error es generado automáticamente por express-openapi-validator, sin código manual de validación.

🧪 Ejemplos de Peticiones Inválidas
Request Body	Motivo del error
{ "titulo": "API", ... }	titulo es demasiado corto (minLength: 5)
{ "clave": "1234" }	clave debe tener exactamente 8 caracteres
{ "autor": "" }	autor debe tener al menos 3 caracteres
JSON vacío	faltan las 3 propiedades requeridas
📖 Tecnologías Utilizadas

Node.js + Express – Servidor web

Swagger UI – Documentación automática

express-openapi-validator – Validación automática

YAMLJS – Carga del archivo OpenAPI

API First Approach – Diseño antes del código

📝 Justificación Académica del Proyecto

Este proyecto demuestra dominio del enfoque API First, donde:

Primero se define la API mediante un documento openapi.yaml.

Posteriormente se implementa el servidor que se ajusta estrictamente a esa definición.

Todas las validaciones son gestionadas por un middleware especializado, garantizando consistencia, seguridad y cumplimiento de reglas.

La documentación es generada automáticamente a partir del YAML, asegurando mantenibilidad y trazabilidad.

Con esto, se cumple totalmente el enfoque profesional moderno para el diseño de APIs REST.

📦 Autor
ANDRES MEDINA HERNANDEZ
Proyecto desarrollado como parte del Examen – Unidad 5: Implementación API First.

🟢 Licencia

Este proyecto es de uso académico y libre para continuar su desarrollo.


---

```
