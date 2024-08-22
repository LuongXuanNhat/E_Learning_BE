const db = require("../models");
const Attendance = db.Attendance;
const User = db.User;
const { Op } = require("sequelize");

// Danh sách điểm danh theo lớp
exports.getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll({
      where: {
        class_id: req.params.id,
        status: {
          [Op.notIn]: ["Open", "Close"],
        },
      },
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["user_id", "name"],
        },
      ],
    });
    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

async function checkAttendanceToday(class_id) {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  const attendanceToday = await Attendance.findAll({
    where: {
      class_id: class_id,
      created_at: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });

  return attendanceToday.length > 0;
}

async function getAttendanceOpenToday(class_id) {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  const attendanceToday = await Attendance.findAll({
    where: {
      class_id: class_id,
      created_at: {
        [Op.between]: [startOfDay, endOfDay],
      },
      status: "Open",
    },
  });

  return attendanceToday.length === 1 ? attendanceToday[0] : null;
}

async function getMyAttendanceOpenToday(class_id, user_id) {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  const attendanceToday = await Attendance.findAll({
    where: {
      class_id: class_id,
      student_id: user_id,
      created_at: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });

  return attendanceToday.length === 1;
}

async function getAttendanceCloseToday(class_id) {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  const attendanceToday = await Attendance.findAll({
    where: {
      class_id: class_id,
      created_at: {
        [Op.between]: [startOfDay, endOfDay],
      },
      status: "Close",
    },
  });

  return attendanceToday.length === 1 ? attendanceToday[0] : null;
}

exports.createAttendance = async (req, res) => {
  try {
    const { class_id, student_id } = req.body;
    const user = await User.findByPk(student_id);

    if (user.chuc_vu == "Giảng viên" || user.chuc_vu == "Cố vấn học tập") {
      if (!(await checkAttendanceToday(class_id))) {
        const attendance = await Attendance.create(req.body);
        attendance.status = "Open";
        await attendance.save();
        res.status(201).json("Đã mở điểm danh cho buổi học hôm nay");
      } else {
        const attendanceFirst = await getAttendanceOpenToday(class_id);
        if (attendanceFirst) {
          await Attendance.update(
            { status: "Close" },
            { where: { attendance_id: attendanceFirst.attendance_id } }
          );
          return res.status(200).json("Đã đóng điểm danh.");
        }

        const attendanceLast = await getAttendanceCloseToday(class_id);
        if (attendanceLast) {
          await Attendance.update(
            { status: "Open" },
            { where: { id: attendanceLast.id } }
          );
          return res.status(200).json("Đã mở điểm danh.");
        }
      }
    } else {
      if (await checkAttendanceToday(class_id)) {
        await Attendance.create(req.body);
        res.status(200).json("Điểm danh thành công." );
      } else {
        res.status(200).json("Bạn không thể điểm danh." );
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Có lỗi xảy ra." });
  }
};

exports.checkAttendance = async (req, res) => {
  try {
    const attendance = await getAttendanceOpenToday(req.params.id);

    if (attendance) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.checkMyAttendance = async (req, res) => {
  try {
    const attendance = await getMyAttendanceOpenToday(
      req.params.id,
      req.params.user_id
    );

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (attendance) {
      await attendance.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};
