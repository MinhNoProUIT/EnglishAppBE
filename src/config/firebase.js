// ✅ CHỈ EXPORT `admin` TRỰC TIẾP
const admin = require("firebase-admin");

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

module.exports = admin; // ❗ không bọc trong { admin }
