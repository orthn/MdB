const express = require('express');
const {home, getStudents, getStudentById, createStudent, resetPassword, login, createMany, deleteStudent} = require("../controllers/studentController");
const router = express.Router();

router.get('/', home);
router.get('/getAll', getStudents);
router.get('/:id', getStudentById)

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/models/student'
 *     responses:
 *       201:
 *         description: The created user
 */
router.post('/create', createStudent);
router.post('/create-many', createMany);
router.post('/login', login);

router.patch('/:id/reset-password', resetPassword);

router.delete('/:id', deleteStudent);

module.exports = router;