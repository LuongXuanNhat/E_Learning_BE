const db = require("../models");
const Lession = db.LessionVideo;
const { Op } = require("sequelize");

exports.getLessionVideos = async (req, res) => {
  try {
    const LessionVideos = await Lession.findAll({
      where: { class_id: req.params.id },
      order: [["created_at", "DESC"]],
    });
    res.json(LessionVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.getLessionVideo = async (req, res) => {
  try {
    const LessionVideo = await Lession.findByPk(req.params.id);
    if (LessionVideo) {
      res.json(LessionVideo);
    } else {
      res.status(404).json({ message: "Không tìm thấy bài giảng này" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.createLessionVideo = async (req, res) => {
  try {
    const LessionVideo = await Lession.create(req.body);
    res.status(201).json(LessionVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.updateLessionVideo = async (req, res) => {
  try {
    const LessionVideo = await Lession.findByPk(req.params.id);
    if (LessionVideo) {
      await LessionVideo.update(req.body);
      res.json(LessionVideo);
    } else {
      res.status(404).json({ message: "Không tìm thấy bài giảng này" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.deleteLessionVideo = async (req, res) => {
  try {
    const LessionVideo = await Lession.findByPk(req.params.id);
    if (LessionVideo) {
      await LessionVideo.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Không tìm thấy bài giảng này" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};
