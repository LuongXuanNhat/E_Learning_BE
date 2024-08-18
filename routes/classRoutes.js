const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API for managing classes
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Retrieve a list of classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
router.get("/", classController.getAllClasses);

/**
 * @swagger
 * /api/classes/1:
 *   get:
 *     summary: Retrieve a list of classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
router.get("/1", classController.getClassesWithNullCourseId);

/**
 * @swagger
 * /api/classes/2:
 *   get:
 *     summary: Retrieve a list of classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
router.get("/2", classController.getClassesWithNonNullCourseId);

/**
 * @swagger
 * /api/classes/list:
 *   get:
 *     summary: Retrieve a list of regiscourse classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
router.get("/list", classController.getRegisterCourse);
/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Retrieve a single class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */
router.get("/:id", classController.getClassById);

/**
 * @swagger
 * /api/classes/students/{id}:
 *   get:
 *     summary: Retrieve a single class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */
router.get("/students/:id", classController.getStudentClassById);

/**
 * @swagger
 * /api/classes/myclasses/{student_id}:
 *   get:
 *     summary: Retrieve a single class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */
router.get("/myclasses/:student_id", classController.getMyClass);

/**
 * @swagger
 * /api/classes/register/{id}:
 *   get:
 *     summary: Retrieve classes registered by user
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: A list of classes registered by user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       404:
 *         description: No classes found
 */
router.get("/register/:id", classController.getListclassRegisterbyUser);

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassInput'
 *     responses:
 *       200:
 *         description: Class created
 *       400:
 *         description: Bad request
 */
router.post("/", classController.createClass);

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     summary: Update a class by ID
 *     tags: [Classes]
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
 *             $ref: '#/components/schemas/ClassInput'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Không tìm thấy lớp
 */
router.put("/:id", classController.updateClass);

/**
 * @swagger
 * /api/classes/list/{id}:
 *   get:
 *     summary: Update a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: get information success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Không tìm thấy lớp
 */
router.get("/list/:id", classController.getRegisterdCourse);

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Delete a class by ID
 *     tags: [Classes]
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
 *         description: Không tìm thấy lớp
 */
router.delete("/:id", classController.deleteClass);

module.exports = router;
