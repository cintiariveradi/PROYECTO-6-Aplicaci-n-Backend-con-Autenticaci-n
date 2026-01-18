const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Proyecto 6 API - Auth + Tasks",
      version: "1.0.0",
      description: "API con autenticación JWT y CRUD de tareas asociadas a usuarios."
    },
    servers: [{ url: "http://localhost:3000", description: "Local" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJSDoc(options);
