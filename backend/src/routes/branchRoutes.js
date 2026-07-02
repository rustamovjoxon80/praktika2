const express = require('express');
const { 
  getAllBranches, 
  getBranchById, 
  createBranch, 
  updateBranch, 
  deleteBranch 
} = require('../controllers/branchController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: Branch management operations
 */

/**
 * @swagger
 * /api/branches:
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of branches
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, getAllBranches);

/**
 * @swagger
 * /api/branches/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Branch data
 *       404:
 *         description: Branch not found
 */
router.get('/:id', authenticate, getBranchById);

/**
 * @swagger
 * /api/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - manager
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               manager:
 *                 type: string
 *               email:
 *                 type: string
 *               statusKey:
 *                 type: string
 *               statusColor:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created branch
 *       500:
 *         description: Server error
 */
router.post('/', authenticate, createBranch);

/**
 * @swagger
 * /api/branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               manager:
 *                 type: string
 *               email:
 *                 type: string
 *               statusKey:
 *                 type: string
 *               statusColor:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated branch
 */
router.put('/:id', authenticate, updateBranch);

/**
 * @swagger
 * /api/branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 */
router.delete('/:id', authenticate, deleteBranch);

module.exports = router;
