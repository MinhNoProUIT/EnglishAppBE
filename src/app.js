const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const userErrorReportRoutes = require("./routes/userErrorReport.routes");
const courseRoutes = require("./routes/course.routes");
const commentRoutes = require("./routes/comment.routes");
const reactCommentRoutes = require("./routes/reactComment.routes");
const reactPostRoutes = require("./routes/reactPost.routes");
const sharedPostRoutes = require("./routes/sharedPost.routes");
const groupRoutes = require("./routes/group.routes");
const groupMemberRoutes = require("./routes/groupMember.routes");
const messageRoutes = require("./routes/message.routes");
const coinTransactionRoutes = require("./routes/cointransaction.routes");
const userAbuseReport = require("./routes/userabuserreport.routes");

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
app.use("/api/courses", courseRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/react-comments", reactCommentRoutes);
app.use("/api/react-posts", reactPostRoutes);
app.use("/api/shared-post", sharedPostRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/group-members", groupMemberRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/coin-transactions", coinTransactionRoutes);
app.use("/api/user-abuse-reports", userAbuseReport);

module.exports = app;
