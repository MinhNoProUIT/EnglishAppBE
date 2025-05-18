const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const userErrorReportRoutes = require("./routes/userErrorReport.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "English App API",
      version: "1.0.0",
      description: "API Documentation with Swagger",
    },
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user-error-reports", userErrorReportRoutes);

module.exports = app;
