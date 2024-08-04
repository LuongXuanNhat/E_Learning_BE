const db  = require('../models');
const Comment = db.Comment;
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      await comment.update(req.body);
      res.json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      await comment.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};
