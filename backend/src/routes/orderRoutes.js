const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders
 */
router.get('/', authenticate, getOrders);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - total
 *             properties:
 *               branchId:
 *                 type: integer
 *                 default: 1
 *               total:
 *                 type: number
 *               status:
 *                 type: string
 *                 default: pending
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nameKey:
 *                       type: string
 *                     price:
 *                       type: number
 *                     qty:
 *                       type: integer
 *                     note:
 *                       type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post('/', createOrder);

module.exports = router;
