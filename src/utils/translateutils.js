const translatte = require("translatte");

async function translateToVietnamese(text) {
  try {
    const result = await translatte(text, { to: "vi" });
    return result.text; // Trả về kết quả dịch thay vì console.log
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi
  }
}

module.exports = { translateToVietnamese };
