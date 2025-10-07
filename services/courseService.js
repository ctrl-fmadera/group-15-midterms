const Course = require('../models/Course')

async function createCourse(courseData) {
    const course = new Course(courseData);
    return course.save();
}

module.exports = { ceateCourse }