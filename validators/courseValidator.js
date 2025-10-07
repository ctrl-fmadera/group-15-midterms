const { body } = require('express-validator')

const createCourseValidator = [
    body('name').notEmpty().withMessage('Course title is required.')
];

module.exports = { createCourseValidator }