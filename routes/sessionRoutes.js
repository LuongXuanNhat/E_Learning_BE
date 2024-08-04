const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: API for managing sessions
 */

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Retrieve a list of sessions
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: A list of sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Session'
 */
router.get('/', sessionController.getSessions);

/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Retrieve a single session by ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single session
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 */
router.get('/:id', sessionController.getSession);

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create a new session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SessionInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post('/', sessionController.createSession);

/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     summary: Delete a session by ID
 *     tags: [Sessions]
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
 *         description: Session not found
 */
router.delete('/:id', sessionController.deleteSession);

module.exports = router;
