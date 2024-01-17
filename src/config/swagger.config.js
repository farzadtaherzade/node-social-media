const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerConfig = (app) => {
  const swaggerDoc = swaggerJsDoc({
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "social-media",
        description: "social media made by nodejs",
        version: "1.0.0",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });
  const swagger = swaggerUI.setup(swaggerDoc, { explorer: true });
  app.use("/api", swaggerUI.serve, swagger);
};
module.exports = swaggerConfig;
