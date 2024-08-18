const db = require("../models");
const LessionVideo = db.LessionVideo;
const { Op } = require("sequelize");

exports.getLessionVideos = async (req, res) => {
  try {
    const LessionVideos = await LessionVideo.findAll();
    res.json(LessionVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.getLessionVideo = async (req, res) => {
  try {
    const LessionVideo = await LessionVideo.findByPk(req.params.id);
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
    const { name } = req.body;
    const existingLessionVideo = await LessionVideo.findOne({
      where: { name },
    });
    if (existingLessionVideo) {
      return res.status(400).json({ message: "Bị trùng tên bài giảng" });
    }

    const LessionVideo = await LessionVideo.create(req.body);
    res.status(201).json(LessionVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.updateLessionVideo = async (req, res) => {
  try {
    const LessionVideo = await LessionVideo.findByPk(req.params.id);
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
    const LessionVideo = await LessionVideo.findByPk(req.params.id);
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
