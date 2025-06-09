const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const userErrorReportRoutes = require("./routes/userErrorReport.routes");
const topicRoutes = require("./routes/topic.routes");
const courseRoutes = require("./routes/course.routes");
const wordRoutes = require("./routes/word.routes");
const commentRoutes = require("./routes/comment.routes");
const reactCommentRoutes = require("./routes/reactComment.routes");
const reactPostRoutes = require("./routes/reactPost.routes");
const sharedPostRoutes = require("./routes/sharedPost.routes");
const groupRoutes = require("./routes/group.routes");
const groupMemberRoutes = require("./routes/groupMember.routes");
const messageRoutes = require("./routes/message.routes");
const authRoutes = require("./routes/auth.routes");
const coinTransactionRoutes = require("./routes/cointransaction.routes");
const userAbuseReportRoutes = require("./routes/userabuserreport.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const paymentRoutes = require("./routes/payment.routes");
const userProgressRoutes = require("./routes/userProgress.routes");
const quizRoutes = require("./routes/quiz.routes");
const quizQuestionRoutes = require("./routes/quizQuestion.routes");
const premiumPackageRoutes = require("./routes/premiumpackage.routes");
const userCoinRoutes = require("./routes/usercoin.routes");
const userCourseRoutes = require("./routes/usercourse.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// const PayOS = require("@payos/node");

// const payOS = new PayOS(
//   process.env.PAYOS_CLIENT_ID,
//   process.env.PAYOS_API_KEY,
//   process.env.PAYOS_CHECKSUM_KEY
// );

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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"], // Swagger annotations
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
app.use("/api/topics", topicRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/words", wordRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/react-comments", reactCommentRoutes);
app.use("/api/react-posts", reactPostRoutes);
app.use("/api/shared-post", sharedPostRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/group-members", groupMemberRoutes);
app.use("/api/messages", messageRoutes);
app.use("/auth", authRoutes);
app.use("/api/coin-transactions", coinTransactionRoutes);
app.use("/api/user-abuse-reports", userAbuseReportRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/user-progress", userProgressRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quiz-questions", quizQuestionRoutes);
app.use("/api/premium-package", premiumPackageRoutes);
app.use("/api/user-coins", userCoinRoutes);
app.use("/api/user-course", userCourseRoutes);

module.exports = app;
