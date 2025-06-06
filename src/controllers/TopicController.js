const TopicService = require("../services/TopicService");
const {
  mapGetAllTopicsToVModel,
  mapCreateTopicToVModel,
  mapUpdateTopicToVModel,
} = require("../mappings/TopicMapping");

const TopicController = {
  async getAllTopics(req, res) {
    try {
      const allTopics = await TopicService.getAllTopics();
      res.json(allTopics.map(mapGetAllTopicsToVModel));
    } catch (err) {
      console.error("Error in getAllTopics:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createTopic(req, res) {
    try {
      const newTopic = await TopicService.createTopic(req.body);
      res.status(201).json(mapCreateTopicToVModel(newTopic));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateTopic(req, res) {
    try {
      const { id } = req.params;
      const updateTopic = await TopicService.updateTopic(id, req.body);
      res.status(200).json(mapUpdateTopicToVModel(updateTopic));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteTopic(req, res) {
    try {
      const { id } = req.params;
      await TopicService.deleteTopic(id);
      res.json({ message: `Deleted topic with id ${id}` });
    } catch (err) {
      console.error("Error in deleteTopic:", err);
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = TopicController;
