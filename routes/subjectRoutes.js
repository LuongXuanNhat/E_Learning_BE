const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: API for managing subjects
 */

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Retrieve a list of subjects
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: A list of subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 */
router.get("/", subjectController.getSubjects);

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Retrieve a single subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single subject
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 */
router.get("/:id", subjectController.getSubject);

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubjectInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/", subjectController.createSubject);

/**
 * @swagger
 * /api/subjects/{id}:
 *   put:
 *     summary: Update a subject by ID
 *     tags: [Subjects]
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
 *             $ref: '#/components/schemas/SubjectInput'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subject not found
 */
router.put("/:id", subjectController.updateSubject);

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     summary: Delete a subject by ID
 *     tags: [Subjects]
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
 *         description: Subject not found
 */
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;
