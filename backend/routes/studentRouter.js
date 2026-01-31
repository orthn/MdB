const express = require('express');
const router = express.Router();

const {
    getStudents,
    getStudentById,
    createStudent,
    resetPassword,
    login,
    createMany,
    deleteStudent,
    updateUser,
    getUserSettings
} = require("../controllers/studentController");

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

router.put('/:id/update', updateUser);
router.put('/:id/reset-password', resetPassword);

router.delete('/:id', deleteStudent);

module.exports = router;