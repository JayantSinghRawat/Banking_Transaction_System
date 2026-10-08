const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/* 
*- Routes
*/

const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")

/* 
*- Use Routes
*/
app.get("/",(req,res)=>{
    res.send("Ledger service is up and running")
})

app.use("/api/auth",authRouter)
app.use("/api/accounts",accountRouter)
app.use("/api/transactions",transactionRoutes)


module.exports = app;