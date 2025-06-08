require("dotenv").config();
const app = require("./src/app");
const https = require("https");
const { Server } = require("socket.io");
const socketHandler = require("./src/sockets/index");

const PORT = process.env.PORT || 5000;

// Load SSL certs (bạn phải có file key.pem và cert.pem ở thư mục ssl/)
const privateKey = fs.readFileSync(path.join(__dirname, "ssl", "key.pem"), "utf8");
const certificate = fs.readFileSync(path.join(__dirname, "ssl", "cert.pem"), "utf8");

const credentials = { key: privateKey, cert: certificate };

// Tạo HTTPS server
const server = https.createServer(credentials, app);

const io = new Server(server, {
  cors: {
    origin: "*",          
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

socketHandler(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
