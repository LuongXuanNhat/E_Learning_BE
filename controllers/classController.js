const db  = require('../models');
const Class = db.Class;
const Course =db.Course;
const User = db.User;
const Enrollment = db.Enrollment;
const ClassListDTO = require('../DTO/ClassListDTO');
const ClassRegisterByUserDTO = require('../DTO/ClassRegisterByUserDTO');

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    const classListDetails = await Promise.all(classes.map(async (classItem) => {
      let courseDetails =[];
      let userDetails =[];
    // Tìm tên user
    if (classItem.advisor_id) {
      userDetails = await User.findByPk(classItem.advisor_id);
    }


      // Kiểm tra course_id có null hay không
      if (classItem.course_id) {
        courseDetails = await Course.findByPk(classItem.course_id);
        const now = new Date();

        // Kiểm tra điều kiện hợp lệ của courseDetails
        if (courseDetails && (new Date(courseDetails.registration_deadline) < now && courseDetails.status === true)) {
          // Điều kiện hợp lệ, giữ nguyên courseDetails
        } else {
          // Không hợp lệ, đặt courseDetails là null
          courseDetails = null;
        }
      }

      // Nếu course_id là null, không cần kiểm tra điều kiện
      if (!classItem.course_id || courseDetails) {
        return new ClassListDTO(classItem, courseDetails, userDetails);
      }

      // Trả về null nếu lớp không hợp lệ
      return null;
    }));

    // Lọc ra các lớp học null
    const filteredClassListDetails = classListDetails.filter(item => item !== null);

    res.json(filteredClassListDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findByPk(req.params.id);
    if (classItem) {
      res.json(classItem);
    } else {
      res.status(404).json({ message: 'Không tìm thấy lớp' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    if(!req.body.create_at) {
      req.body.create_at = new Date();
    }
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classDetails = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!id || !classDetails) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // Kiểm tra bản ghi tồn tại
    const classToUpdate = await Class.findByPk(id);
    if (!classToUpdate) {
      return res.status(404).json({ message: 'Không tìm thấy lớp' });
    }
    // Nếu course_id không có trong dữ liệu đầu vào, giữ nguyên giá trị hiện tại
    if (!classDetails.hasOwnProperty('course_id')) {
      classDetails.course_id = classToUpdate.course_id;
    } else if (classDetails.course_id === null && classToUpdate.course_id !== null) {
      classDetails.course_id = classToUpdate.course_id;
    }
    // Cập nhật bản ghi
    const [updated] = await Class.update(classDetails, {
      where: { class_id: id }
    });

    if (updated) {
      const updatedClass = await Class.findByPk(id);
      res.status(200).json(updatedClass);
    } else {
      res.status(500).json({ message: 'cập nhật thông tin lớp thất bại' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const deleted = await Class.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Class deleted' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy lớp' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getRegisterCourse = async (req, res) => {
  try {
    // console.log(">>find class");
    const classes = await Class.findAll();
    // console.log("check class s")
    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "No classes found" });
    }

    const classListDetails = await Promise.all(classes.map(async (classItem) => {
      let courseDetails = [];
      let userDetails = [];

      if (classItem.advisor_id) {
        userDetails = await User.findByPk(classItem.advisor_id);
      }

      if (classItem.course_id) {
        courseDetails = await Course.findByPk(classItem.course_id);
        if (!courseDetails) {
          console.log(`Course not found for class_id: ${classItem.class_id}`);
          return null;
        }
        // console.log(">>> name: " + courseDetails.name);
        const now = new Date();
        const registrationDeadline = new Date(courseDetails.registration_deadline);
        const isWithinRegistration = registrationDeadline >= now && courseDetails.status == true;
        const isOutOfDate = registrationDeadline < now && courseDetails.status == null;
        // Ghi log chi tiết lớp học và điều kiện đăng ký
        // console.log(`Class: ${classItem.class_id}, Advisor: ${classItem.advisor_id}, Course: ${classItem.course_id}`);
        // console.log(`Course Details:`, courseDetails);
        // console.log(`Registration Deadline: ${registrationDeadline}, Now: ${now}`);
        // console.log(`isWithinRegistration: ${isWithinRegistration}, isOutOfDate: ${isOutOfDate}`);
        if (isWithinRegistration || isOutOfDate) {
          return new ClassListDTO(classItem, courseDetails, userDetails);
        }
      }

      return null;
    }));

    const filteredClassListDetails = classListDetails.filter(item => item !== null);

    if (filteredClassListDetails.length === 0) {
      return res.status(200).json();
    }

    res.json(filteredClassListDetails);
  } catch (error) {
    console.error('Error in getRegisterCourse:', error);
    res.status(500).json({ error: "Internal Có gì đó đã xảy ra! " });
  }
};

exports.getRegisterdCourse = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Tìm tất cả các bản ghi enrollment của sinh viên này
    const enrollments = await Enrollment.findAll({
      where: { student_id: studentId },
      include: [
        { model: Class, include: [{ model: Course, as: 'Course' }, { model: User, as: 'Advisor' }] }
      ]
    });

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ message: "Sinh viên chưa tham gia khóa học nào" });
    }

    const now = new Date();

    const classListDetails = enrollments.map(enrollment => {
      const classItem = enrollment.Class;
      const courseDetails = classItem.Course;
      const userDetails = classItem.Advisor;

      if (!courseDetails) {
        console.log(`Khóa học chưa được khai giảng: ${classItem.class_id}`);
        return null;
      }

      const registrationDeadline = new Date(courseDetails.registration_deadline);
      const isWithinRegistration = registrationDeadline >= now && courseDetails.status === true;
      const isOutOfDate = registrationDeadline < now && courseDetails.status === false;

      if (isWithinRegistration || isOutOfDate) {
        return new ClassListDTO(classItem, courseDetails, userDetails);
      }

      return null;
    }).filter(item => item !== null);

    if (classListDetails.length === 0) {
      return res.status(404).json({ message: "No eligible classes found" });
    }

    res.json(classListDetails);
  } catch (error) {
    console.error('Error in getRegisterdCourse:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getListclassRegisterbyUser = async (req,res) => {
  
    try {
      const userId = req.params.id; 
      const classes = await Class.findAll();
      // console.log("check class s")
      if (!classes || classes.length === 0) {
        return res.status(404).json({ message: "No classes found" });
      }
  
      const classListDetails = await Promise.all(classes.map(async (classItem) => {
        let courseDetails = [];
        let userDetails = [];
        let isRegistered = false;

        if (classItem.advisor_id) {
          userDetails = await User.findByPk(classItem.advisor_id);
        }
  
        if (classItem.course_id) {
          courseDetails = await Course.findByPk(classItem.course_id);
          if (!courseDetails) {
            console.log(`Course not found for class_id: ${classItem.class_id}`);
            return null;
          }
          // console.log(">>> name: " + courseDetails.name);
          const enrollment = await Enrollment.findOne({ 
            where: { student_id: userId, class_id: classItem.class_id } 
          });
          if (enrollment) {
            isRegistered = true;
          }
          const now = new Date();
          const registrationDeadline = new Date(courseDetails.registration_deadline);
          const isWithinRegistration = registrationDeadline >= now && courseDetails.status == true;
          const isOutOfDate = registrationDeadline < now && courseDetails.status == null;
          // Ghi log chi tiết lớp học và điều kiện đăng ký
          // console.log(`Class: ${classItem.class_id}, Advisor: ${classItem.advisor_id}, Course: ${classItem.course_id}`);
          // console.log(`Course Details:`, courseDetails);
          // console.log(`Registration Deadline: ${registrationDeadline}, Now: ${now}`);
          // console.log(`isWithinRegistration: ${isWithinRegistration}, isOutOfDate: ${isOutOfDate}`);
        if (isWithinRegistration || isOutOfDate) {
          return new ClassRegisterByUserDTO(classItem, courseDetails, userDetails, isRegistered);
        }
      }

      return null;
    }));

  
      const filteredClassListDetails = classListDetails.filter(item => item !== null);
  
      if (filteredClassListDetails.length === 0) {
        return res.status(200).json([]);
      }
  
      res.json(filteredClassListDetails);
    } catch (error) {
      console.error('Error in getRegisterCourse:', error);
      res.status(500).json({ error: "Internal Có gì đó đã xảy ra! " });
    }
  };
