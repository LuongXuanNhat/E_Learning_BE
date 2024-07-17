const db  = require('../models');
const ChatMessage = db.ChatMessage;
exports.getChatMessages = async (req, res) => {
  try {
    const chatMessages = await ChatMessage.findAll();
    res.json(chatMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getChatMessage = async (req, res) => {
  try {
    const chatMessage = await ChatMessage.findByPk(req.params.id);
    if (chatMessage) {
      res.json(chatMessage);
    } else {
      res.status(404).json({ message: 'ChatMessage not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createChatMessage = async (req, res) => {
  try {
    const chatMessage = await ChatMessage.create(req.body);
    res.status(201).json(chatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateChatMessage = async (req, res) => {
  try {
    const chatMessage = await ChatMessage.findByPk(req.params.id);
    if (chatMessage) {
      await chatMessage.update(req.body);
      res.json(chatMessage);
    } else {
      res.status(404).json({ message: 'ChatMessage not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteChatMessage = async (req, res) => {
  try {
    const chatMessage = await ChatMessage.findByPk(req.params.id);
    if (chatMessage) {
      await chatMessage.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'ChatMessage not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
