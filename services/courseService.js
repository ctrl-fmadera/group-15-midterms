const Course = require('../models/Course')

async function createCourse(courseData) {
    const course = new Course(courseData);
    return course.save();
}

async function getCourseById(id) {
    return Course.findById(id);
}

async function updateCourse(id, updateData) {
    return findByIdandUpdate(id, updateData, { new: true })
}

async function deleteCourse(id) {
    return Course.findByIdandDelete(id)
}

async function getAllCourse() {
    return Course.find()
}

module.exports = { createCourse, getCourseById, updateCourse, deleteCourse, getAllCourse }