const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School Management API',
            version: '1.0.0',
            description: 'API documentation for the School Management System',
        },
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./routes/*.js'], // path to files with API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         username:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [male, female]
 *     UserInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - gender
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [male, female]
 */