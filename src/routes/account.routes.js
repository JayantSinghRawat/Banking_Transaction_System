const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router();

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: Create a new bank account
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/",
    authMiddleware.authMiddleware,
    accountController.createAccountController
);

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Get all accounts of the logged-in user
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accounts retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/",
    authMiddleware.authMiddleware,
    accountController.getUserAccountsController
);

/**
 * @swagger
 * /api/accounts/balance/{accountId}:
 *   get:
 *     summary: Get account balance
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the account
 *         example: 6ac68380be3b6968851295bb
 *     responses:
 *       200:
 *         description: Account balance retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 */
router.get(
    "/balance/:accountId",
    authMiddleware.authMiddleware,
    accountController.getAccountBalanceController
);

module.exports = router;