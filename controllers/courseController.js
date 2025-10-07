const courseService = require('../services/courseService');

async function createCourse(req, res) {
  if (req.user.role !== 'instructor') return res.status(403).send('Forbidden');
  try {
    const course = await courseService.createCourse({ ...req.body, instructorId: req.user.id });
    res.json(course);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

async function updateCourse(req, res) {
  const course = await courseService.getCourseById(req.params.id);
  if (!course || course.instructorId.toString() !== req.user.id) return res.status(403).send('Forbidden: You are not the creator of this course.');
  try {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

async function deleteCourse(req, res) {
  const course = await courseService.getCourseById(req.params.id);
  if (!course || course.instructorId.toString() !== req.user.id) return res.status(403).send('Forbidden: You are not the creator of this course.');
  try {
    await courseService.deleteCourse(req.params.id);
    res.send('Deleted');
  } catch (err) {
    res.status(500).send('Server error');
  }
}

async function getCourses(req, res) {
  try {
    const courses = await courseService.getAllCourse();
    res.json(courses);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

module.exports = { createCourse, updateCourse, deleteCourse, getCourses }
