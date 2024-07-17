const db  = require('../models');
const Grade = db.Grade;
exports.getGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll();
    res.json(grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getGrade = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (grade) {
      res.json(grade);
    } else {
      res.status(404).json({ message: 'Grade not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createGrade = async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (grade) {
      await grade.update(req.body);
      res.json(grade);
    } else {
      res.status(404).json({ message: 'Grade not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (grade) {
      await grade.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Grade not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
