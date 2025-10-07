const { body, validationResult } = require('express-validator');

const lessonValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('courseId').isInt().withMessage('Course ID must be an integer'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
};

module.exports = {
  lessonValidationRules
};