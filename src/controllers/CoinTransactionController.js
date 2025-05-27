const {
  mapGetAllCoinTransactionsToVModel,
} = require("../mappings/CoinTransactionMapping");
const CoinTransactionService = require("../services/CoinTransactionService");
const { Parser } = require("json2csv");

const CoinTransactionController = {
  async getAllCoinTransactions(req, res) {
    try {
      const transactions =
        await CoinTransactionService.getAllCoinTransactions();
      res.json(transactions.map(mapGetAllCoinTransactionsToVModel));
    } catch (err) {
      console.error("Error in getAllCoinTransactions:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getMonthlySummary(req, res) {
    try {
      const { user_id } = req.params;
      const summary = await CoinTransactionService.getMonthlyCoinSummary(
        user_id
      );
      res.json(summary);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createCoinTransaction(req, res) {
    try {
      const data = req.body;
      const created = await CoinTransactionService.createCoinTransaction(data);
      res.status(201).json(created);
    } catch (err) {
      console.error("Error in createCoinTransaction:", err);
      res.status(400).json({ error: err.message });
    }
  },

  async deleteCoinTransaction(req, res) {
    try {
      const { id } = req.params;
      await CoinTransactionService.deleteCoinTransaction(id);
      res.json({ message: `Deleted coin transaction with id ${id}` });
    } catch (err) {
      console.error("Error in deleteCoinTransaction:", err);
      res.status(400).json({ error: err.message });
    }
  },

  async exportCoinTransactions(req, res) {
    try {
      const transactions =
        await CoinTransactionService.getAllCoinTransactions();

      const fields = [
        "id",
        "user_id",
        "amount",
        "reason",
        "reference_id",
        "reference_table",
        "created_at",
      ];

      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(transactions);

      res.header("Content-Type", "text/csv");
      res.attachment("coin_transactions.csv");
      return res.send(csv);
    } catch (err) {
      console.error("Error in exportCoinTransactions:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = CoinTransactionController;
