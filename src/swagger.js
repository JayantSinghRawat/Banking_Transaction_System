const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Banking Transaction System API",
            version: "1.0.0",
            description:
                "Backend API for a banking transaction system with authentication, accounts, transactions, idempotency, and ledger management.",
        },

        servers: [
            {
                url: process.env.BASE_URL || "http://localhost:3000",
                description: "API server",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },

    apis: ["./src/routes/*.routes.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;