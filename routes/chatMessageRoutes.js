const express = require('express');
const router = express.Router();
const chatMessageController = require('../controllers/chatMessageController');

/**
 * @swagger
 * tags:
 *   name: ChatMessages
 *   description: API for managing chat messages
 */

/**
 * @swagger
 * /api/chatmessages:
 *   get:
 *     summary: Retrieve a list of chat messages
 *     tags: [ChatMessages]
 *     responses:
 *       200:
 *         description: A list of chat messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChatMessage'
 */
router.get('/', chatMessageController.getChatMessages);

/**
 * @swagger
 * /api/chatmessages/{id}:
 *   get:
 *     summary: Retrieve a single chat message by ID
 *     tags: [ChatMessages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single chat message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatMessage'
 */
router.get('/:id', chatMessageController.getChatMessage);

/**
 * @swagger
 * /api/chatmessages:
 *   post:
 *     summary: Create a new chat message
 *     tags: [ChatMessages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatMessageInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post('/', chatMessageController.createChatMessage);

/**
 * @swagger
 * /api/chatmessages/{id}:
 *   delete:
 *     summary: Delete a chat message by ID
 *     tags: [ChatMessages]
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
 *         description: Chat message not found
 */
router.delete('/:id', chatMessageController.deleteChatMessage);

module.exports = router;

