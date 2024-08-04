const db  = require('../models');
const Session = db.Session;
exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll();
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.getSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (session) {
      await session.update(req.body);
      res.json(session);
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (session) {
      await session.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};
