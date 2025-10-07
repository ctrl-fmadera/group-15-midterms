const express = require('express');

const router = express.Router();

// POST /api/courses/:id/enroll
router.post('/api/courses/:id/enroll', (req, res) => {
    const courseId = req.params.id;
    // Enrollment logic here
    // Example: enroll user in courseId
    res.status(201).json({ message: `Enrolled in course ${courseId}` });
});

// GET /api/courses/:id/lessons
router.get('/api/courses/:id/lessons', (req, res) => {
    const courseId = req.params.id;
    // Fetch lessons logic here
    // Example: return dummy lessons array
    res.json({
        courseId,
        lessons: [
            // Example lesson objects
            { id: 1, title: 'Lesson 1' },
            { id: 2, title: 'Lesson 2' }
        ]
    });
});

module.exports = router;