const {
  CoinTransactionVModel,
} = require("../viewmodels/CoinTracsactionVModel");

function mapGetAllCoinTransactionsToVModel(transaction) {
  return new CoinTransactionVModel(transaction);
}

module.exports = {
  mapGetAllCoinTransactionsToVModel,
};
