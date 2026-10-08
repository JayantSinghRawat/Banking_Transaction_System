const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const transactionController = require("../controllers/transaction.controller");
const transactionRoutes = Router();
/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     description: Transfers funds from one account to another. Requires a unique idempotency key to prevent duplicate transactions.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fromAccount
 *               - toAccount
 *               - amount
 *               - idempotencyKey
 *             properties:
 *               fromAccount:
 *                 type: string
 *                 description: ID of the account from which money is transferred
 *                 example: 6ac69a1d3bbb8bd05aa5aebf
 *               toAccount:
 *                 type: string
 *                 description: ID of the account receiving the money
 *                 example: 6ac68380be3b6968851295bb
 *               amount:
 *                 type: number
 *                 description: Amount to transfer
 *                 example: 9000
 *               idempotencyKey:
 *                 type: string
 *                 format: uuid
 *                 description: Unique key used to prevent duplicate transactions
 *                 example: d9212362-2dbc-4fe9-ba27-aab9ce69f948
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Invalid transaction request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 *       409:
 *         description: Duplicate idempotency key or transaction conflict
 *       500:
 *         description: Internal server error
 */
transactionRoutes.post(
    "/",
    authMiddleware.authMiddleware,
    transactionController.createTransaction
);
/**
 * @swagger
 * /api/transactions/system/initial-funds:
 *   post:
 *     summary: Add initial funds to an account
 *     description: Creates an initial funding transaction from the system account to a user's account.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - toAccount
 *               - amount
 *               - idempotencyKey
 *             properties:
 *               toAccount:
 *                 type: string
 *                 description: ID of the account receiving the initial funds
 *                 example: 6ac68380be3b6968851295bb
 *               amount:
 *                 type: number
 *                 description: Initial amount to credit
 *                 example: 10000
 *               idempotencyKey:
 *                 type: string
 *                 format: uuid
 *                 description: Unique key used to prevent duplicate funding
 *                 example: 01a11730-bf38-7477-88c1-ba6b73dd97c0
 *     responses:
 *       201:
 *         description: Initial funds added successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User is not authorized as a system user
 *       404:
 *         description: Account not found
 *       409:
 *         description: Duplicate idempotency key
 *       500:
 *         description: Internal server error
 */
transactionRoutes.post(
    "/system/initial-funds",
    authMiddleware.authSystemUserMiddleware,
    transactionController.createInitialFundsTransaction
);
module.exports = transactionRoutes;