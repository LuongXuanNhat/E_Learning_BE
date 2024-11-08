const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");

/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: API for managing enrollments
 */

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Retrieve a list of enrollments
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: A list of enrollments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enrollment'
 */
router.get("/", enrollmentController.getEnrollments);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   get:
 *     summary: Retrieve a single enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single enrollment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 */
router.get("/:id", enrollmentController.getEnrollment);

/**
 * @swagger
 * /api/enrollments/user/{student_id}/course/{course_id}:
 *   delete:
 *     summary: Hủy đăng kí khóa học
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course
 *     responses:
 *       204:
 *         description: Enrollment successfully canceled
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/user/:student_id/course/:course_id/class/:class_id",
  enrollmentController.cancelEnrollmentByUserIdAndCourseId
);

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/", enrollmentController.createEnrollment);

/**
 * @swagger
 * /api/enrollments/addMember:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/addMember", enrollmentController.addMemberClass);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   delete:
 *     summary: Delete an enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Enrollment not found
 */
router.delete("/:id", enrollmentController.deleteEnrollment);

module.exports = router;
