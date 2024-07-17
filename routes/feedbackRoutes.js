const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: API for managing feedbacks
 */

/**
 * @swagger
 * /api/feedbacks:
 *   get:
 *     summary: Retrieve a list of feedbacks
 *     tags: [Feedbacks]
 *     responses:
 *       200:
 *         description: A list of feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 */
router.get('/', feedbackController.getFeedbacks);

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   get:
 *     summary: Retrieve a single feedback by ID
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single feedback
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 */
router.get('/:id', feedbackController.getFeedback);

/**
 * @swagger
 * /api/feedbacks:
 *   post:
 *     summary: Create a new feedback
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post('/', feedbackController.createFeedback);

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   delete:
 *     summary: Delete a feedback by ID
 *     tags: [Feedbacks]
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
 *         description: Feedback not found
 */
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
