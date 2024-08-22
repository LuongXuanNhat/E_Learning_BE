const express = require("express");
const router = express.Router();
const LessionController = require("../controllers/lessionController");

/**
 * @swagger
 * tags:
 *   name: Lessions
 *   description: API for managing Lessions
 */

/**
 * @swagger
 * /api/Lessions/class/{id}:
 *   get:
 *     summary: Retrieve a list of Lessions
 *     tags: [Lessions]
 *     responses:
 *       200:
 *         description: A list of Lessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lession'
 */
router.get("/class/:id", LessionController.getLessionVideos);

/**
 * @swagger
 * /api/Lessions/{id}:
 *   get:
 *     summary: Retrieve a single Lession by ID
 *     tags: [Lessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single Lession
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lession'
 */
router.get("/:id", LessionController.getLessionVideo);

/**
 * @swagger
 * /api/Lessions:
 *   post:
 *     summary: Create a new Lession
 *     tags: [Lessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LessionInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/", LessionController.createLessionVideo);

/**
 * @swagger
 * /api/Lessions/{id}:
 *   put:
 *     summary: Update a Lession by ID
 *     tags: [Lessions]
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
 *             $ref: '#/components/schemas/LessionInput'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Lession not found
 */
router.put("/:id", LessionController.updateLessionVideo);

/**
 * @swagger
 * /api/Lessions/{id}:
 *   delete:
 *     summary: Delete a Lession by ID
 *     tags: [Lessions]
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
 *         description: Lession not found
 */
router.delete("/:id", LessionController.deleteLessionVideo);

module.exports = router;
