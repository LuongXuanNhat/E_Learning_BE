const { where } = require("sequelize");
const db = require("../models");
const Feedback = db.Feedback;
const User = db.User;
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      where: { class_id: req.params.id },
      include: [
        {
          model: User,
          attributes: ["user_id", "name"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (feedback) {
      res.json(feedback);
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (feedback) {
      await feedback.update(req.body);
      res.json(feedback);
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (feedback) {
      await feedback.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};
