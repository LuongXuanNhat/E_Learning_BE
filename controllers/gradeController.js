const db = require("../models");
const Grade = db.Grade;
const User = db.User;
const Enrollment = db.Enrollment;
const { Op } = require("sequelize");
const { param } = require("../routes/gradeRoutes");

exports.getGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll({
      where: {
        class_id: req.params.id,
      },
      include: [
        {
          model: User,
          as: "Student",
          attributes: ["username", "name"],
        },
      ],
    });
    res.json(grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.updateStudentGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll({
      where: {
        class_id: req.params.id,
      },
      attributes: ["student_id"],
    });
    const studentClasses = await Enrollment.findAll({
      where: {
        class_id: req.params.id,
      },
      attributes: ["student_id"],
    });

    const gradeStudentIds = grades.map((grade) => grade.student_id);
    const studentClassIds = studentClasses.map(
      (enrollment) => enrollment.student_id
    );

    const missingStudentIds = studentClassIds.filter(
      (studentId) => !gradeStudentIds.includes(studentId)
    );

    console.log(missingStudentIds);
    const newGrades = missingStudentIds.map((studentId) => ({
      student_id: studentId,
      class_id: req.params.id,
      rollcall_grade: 0,
      final_grade: 0,
      process_grade: 0,
      rollcall_grade: 0,
      midterm_grade: 0,
      created_at: new Date(),
    }));

    if (newGrades.length > 0) {
      await Grade.bulkCreate(newGrades);
      res.json(`Đã cập nhập ${newGrades.length} học viên vào điểm thành công`);
    } else res.json("Không có học viên mới được cập nhập vào danh sách điểm");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.getGrade = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (grade) {
      res.json(grade);
    } else {
      res.status(404).json({ message: "Grade not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.createGrade = async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.updateGrades = async (req, res) => {
  try {
    const gradeUpdates = req.body;

    if (!Array.isArray(gradeUpdates)) {
      return res.status(200).json("");
    }

    const updatePromises = gradeUpdates.map(async (update) => {
      const grade = await Grade.findByPk(update.grade_id);
      if (grade) {
        return grade.update(update);
      } else {
        return null;
      }
    });

    const updatedGrades = await Promise.all(updatePromises);

    const successfulUpdates = updatedGrades.filter((grade) => grade !== null);

    if (successfulUpdates.length > 0) {
      res.json(successfulUpdates);
    } else {
      res.status(200).json("Không có sự thay đổi nào");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (grade) {
      await grade.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Grade not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};
