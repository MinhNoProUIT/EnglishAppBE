const WordService = require("../services/WordService");
const {
  mapGetAllWordsToVModel,
  mapCreateWordToVModel,
  mapUpdateWordToVModel,
} = require("../mappings/WordMapping");

const WordController = {
  async getAllWords(req, res) {
    try {
      const allWords = await WordService.getAllWords();
      res.json(allWords.map(mapGetAllWordsToVModel));
    } catch (err) {
      console.error("Error in getAllWords:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createWord(req, res) {
    try {
      const newWord = await WordService.createWord(req.body);
      res.status(201).json(mapCreateWordToVModel(newWord));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateWord(req, res) {
    try {
      const { id } = req.params;
      const updateWord = await WordService.updateWord(id, req.body);
      res.status(200).json(mapUpdateWordToVModel(updateWord));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteWord(req, res) {
    try {
      const { id } = req.params;
      await WordService.deleteWord(id);
      res.json({ message: `Deleted word with id ${id}` });
    } catch (err) {
      console.error("Error in deleteWord:", err);
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = WordController;
