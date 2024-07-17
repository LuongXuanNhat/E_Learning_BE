const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');

/**
 * @swagger
 * tags:
 *   name: ChatRooms
 *   description: API for managing chat rooms
 */

/**
 * @swagger
 * /api/chatrooms:
 *   get:
 *     summary: Retrieve a list of chat rooms
 *     tags: [ChatRooms]
 *     responses:
 *       200:
 *         description: A list of chat rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChatRoom'
 */
router.get('/', chatRoomController.getChatRooms);

/**
 * @swagger
 * /api/chatrooms/{id}:
 *   get:
 *     summary: Retrieve a single chat room by ID
 *     tags: [ChatRooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single chat room
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatRoom'
 */
router.get('/:id', chatRoomController.getChatRoom);

/**
 * @swagger
 * /api/chatrooms:
 *   post:
 *     summary: Create a new chat room
 *     tags: [ChatRooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRoomInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post('/', chatRoomController.createChatRoom);

/**
 * @swagger
 * /api/chatrooms/{id}:
 *   delete:
 *     summary: Delete a chat room by ID
 *     tags: [ChatRooms]
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
 *         description: Chat room not found
 */
router.delete('/:id', chatRoomController.deleteChatRoom);

module.exports = router;
