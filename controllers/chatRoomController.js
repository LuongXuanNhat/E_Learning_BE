const db  = require('../models');
const ChatRoom = db.ChatRoom;
exports.getChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.findAll();
    res.json(chatRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.getChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findByPk(req.params.id);
    if (chatRoom) {
      res.json(chatRoom);
    } else {
      res.status(404).json({ message: 'ChatRoom not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.createChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.create(req.body);
    res.status(201).json(chatRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.updateChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findByPk(req.params.id);
    if (chatRoom) {
      await chatRoom.update(req.body);
      res.json(chatRoom);
    } else {
      res.status(404).json({ message: 'ChatRoom not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.deleteChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findByPk(req.params.id);
    if (chatRoom) {
      await chatRoom.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'ChatRoom not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};
