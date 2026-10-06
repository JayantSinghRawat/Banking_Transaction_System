const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const emailService = require("../services/email.service")

/**
 * - Create a new transaction
 * The 10 Step Flow:
 * 1. Validate request
 * 2. Validate idempotency key
 * 3. Check account status
 * 4. Derive sender balance from ledger
 * 5. Create trnsaction(PENDING)
 * 6. Create DEBIT ledger entry
 * 7. Create CREDIT ledger entry
 * 8. Mark transaction Completed
 * 9. Commit MongoDB session
 * 10. Send email notification
 */

async function transactionController(req,res){
    const {fromAccount, toAccount, amount, idempotencyKey} = req.body;
}


module.exports = {
    transactionController
}