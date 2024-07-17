const db  = require('../models');
const Token = db.Token;
exports.getTokens = async (req, res) => {
  try {
    const tokens = await Token.findAll();
    res.json(tokens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getToken = async (req, res) => {
  try {
    const token = await Token.findByPk(req.params.id);
    if (token) {
      res.json(token);
    } else {
      res.status(404).json({ message: 'Token not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createToken = async (req, res) => {
  try {
    const token = await Token.create(req.body);
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateToken = async (req, res) => {
  try {
    const token = await Token.findByPk(req.params.id);
    if (token) {
      await token.update(req.body);
      res.json(token);
    } else {
      res.status(404).json({ message: 'Token not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteToken = async (req, res) => {
  try {
    const token = await Token.findByPk(req.params.id);
    if (token) {
      await token.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Token not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
