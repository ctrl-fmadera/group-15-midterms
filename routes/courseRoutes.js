const express = require('express');
const { createCourse, updateCourse, deleteCourse, getCourses } = require('../controllers/courseController');
const { courseValidator } = require('../validators/courseValidator');
const { validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, courseValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  createCourse(req, res);
});

router.put('/:id', auth, updateCourse);
router.delete('/:id', auth, deleteCourse);
router.get('/', auth, getCourses);

module.exports = router;
