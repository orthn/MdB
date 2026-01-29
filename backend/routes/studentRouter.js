const express = require('express');
const {home, getStudents, getStudentById, createStudent, resetPassword, login, createMany, deleteStudent, updateStudent,
    getUserSettings, updateProgress
} = require("../controllers/studentController");
const router = express.Router();

router.get('/', home);
router.get('/getAll', getStudents);
router.get('/:id', getStudentById)
router.get('/:id/settings', getUserSettings)

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

router.put('/:id/update', updateStudent);
router.put('/:id/reset-password', resetPassword);

router.delete('/:id', deleteStudent);

module.exports = router;