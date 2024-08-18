const db = require("../models");
const Subject = db.Subject;
const { Op } = require("sequelize");

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.getSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (subject) {
      res.json(subject);
    } else {
      res.status(404).json({ message: "Không tìm thấy môn học này" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const existingSubject = await Subject.findOne({ where: { name } });
    if (existingSubject) {
      return res.status(400).json({ message: "Bị trùng tên môn học" });
    }

    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const { name, subject_id } = req.body;
    const existingSubject = await Subject.findOne({
      where: {
        name,
        subject_id: { [Op.ne]: subject_id },
      },
    });
    if (existingSubject) {
      return res.status(400).json({ message: "Bị trùng tên môn học" });
    }

    const subject = await Subject.findByPk(req.params.id);
    if (subject) {
      await subject.update(req.body);
      res.json(subject);
    } else {
      res.status(404).json({ message: "Không tìm thấy môn học này" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (subject) {
      await subject.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Không tìm thấy môn học này" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};
