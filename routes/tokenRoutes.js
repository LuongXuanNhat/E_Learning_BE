const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

/**
 * @swagger
 * tags:
 *   name: Tokens
 *   description: API for managing tokens
 */

/**
 * @swagger
 * /api/tokens:
 *   get:
 *     summary: Retrieve a list of tokens
 *     tags: [Tokens]
 *     responses:
 *       200:
 *         description: A list of tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Token'
 */
router.get('/', tokenController.getTokens);

/**
 * @swagger
 * /api/tokens/{id}:
 *   get:
 *     summary: Retrieve a single token by ID
 *     tags: [Tokens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 */
router.get('/:id', tokenController.getToken);

/**
 * @swagger
 * /api/tokens:
 *   post:
 *     summary: Create a new token
 *     tags: [Tokens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post('/', tokenController.createToken);

/**
 * @swagger
 * /api/tokens/{id}:
 *   delete:
 *     summary: Delete a token by ID
 *     tags: [Tokens]
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
 *         description: Token not found
 */
router.delete('/:id', tokenController.deleteToken);

module.exports = router;
