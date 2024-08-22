const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/gradeController");

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: API for managing grades
 */

/**
 * @swagger
 * /api/grades/id:
 *   get:
 *     summary: Retrieve a list of grades
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: A list of grades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 */
router.get("/:id", gradeController.getGrades);

/**
 * @swagger
 * /api/grades/update/id:
 *   get:
 *     summary: Retrieve a list of grades
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: A list of grades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 */
router.get("/update/:id", gradeController.updateStudentGrades);

/**
 * @swagger
 * /api/grades/update:
 *   get:
 *     summary: Retrieve a single grade by ID
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single grade
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 */
router.post("/update", gradeController.updateGrades);

/**
 * @swagger
 * /api/grades:
 *   post:
 *     summary: Create a new grade
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GradeInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/", gradeController.createGrade);

/**
 * @swagger
 * /api/grades/{id}:
 *   put:
 *     summary: Update a grade by ID
 *     tags: [Grades]
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
 *             $ref: '#/components/schemas/GradeInput'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Grade not found
 */
// router.put("/:id", gradeController.updateGrade);

/**
 * @swagger
 * /api/grades/{id}:
 *   delete:
 *     summary: Delete a grade by ID
 *     tags: [Grades]
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
 *         description: Grade not found
 */
router.delete("/:id", gradeController.deleteGrade);

module.exports = router;
