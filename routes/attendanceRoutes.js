const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

/**
 * @swagger
 * tags:
 *   name: Attendances
 *   description: API for managing attendances
 */

/**
 * @swagger
 * /api/attendances/class/id:
 *   get:
 *     summary: Retrieve a list of attendances
 *     tags: [Attendances]
 *     responses:
 *       200:
 *         description: A list of attendances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendance'
 */
router.get("/class/:id", attendanceController.getAttendances);

/**
 * @swagger
 * /api/attendances/{id}:
 *   get:
 *     summary: Retrieve a single attendance by ID
 *     tags: [Attendances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single attendance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 */
// router.get('/:id', attendanceController.getAttendance);

/**
 * @swagger
 * /api/attendances/myattentdence/{id}:/{user_id}:
 *   get:
 *     summary: Retrieve a single attendance by ID
 *     tags: [Attendances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single attendance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 */
router.get(
  "/myattentdence/:id/:user_id",
  attendanceController.checkMyAttendance
);

/**
 * @swagger
 * /api/attendances:
 *   post:
 *     summary: Create a new attendance record
 *     tags: [Attendances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttendanceInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/", attendanceController.createAttendance);

/**
 * @swagger
 * /api/attendances/{id}:
 *   put:
 *     summary: Update an attendance record by ID
 *     tags: [Attendances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttendanceInput'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Attendance not found
 */
router.get("/:id", attendanceController.checkAttendance);

/**
 * @swagger
 * /api/attendances/{id}:
 *   delete:
 *     summary: Delete an attendance record by ID
 *     tags: [Attendances]
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
 *         description: Attendance not found
 */
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
