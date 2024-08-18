const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.User;
const { Op, where } = require("sequelize"); // Import Op từ Sequelize
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        chuc_vu: {
          [Op.ne]: "Sinh viên",
        },
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.createUser = async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Tài khoản Email này đã được sử dụng " });
    }
    req.body.created_at = new Date();
    //Check if username already used
    const existingUsername = await User.findOne({
      where: { username: req.body.username },
    });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Tên Username này đã được sử dụng" });
    }
    // Create new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

//Login
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy tài khoản" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    // if (req.body.password!= user.password) {
    if (!isMatch) {
      return res.status(400).json({ message: "Tài khoản hoặc mật khẩu sai" });
    }
    // Create and send JWT token
    // const payload = { id: user.id, username: user.username };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: {
          [Op.ne]: "STUDENT", // Điều kiện lọc các user có role khác "STUDENT"
        },
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: {
          [Op.eq]: "STUDENT", // Điều kiện lọc các user có role khác "STUDENT"
        },
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có gì đó đã xảy ra! " });
  }
};
