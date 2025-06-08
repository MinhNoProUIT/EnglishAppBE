function formatResponse(success, data = null, message = "") {
  return { Success: success, Data: data, Message: message };
}

module.exports = { formatResponse };
