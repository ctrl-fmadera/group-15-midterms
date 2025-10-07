const { body, validationResult } = require('express-validator');

const enrollmentValidationRules = () => {
  return [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('courseId').notEmpty().withMessage('Course ID is required'),
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
  enrollmentValidationRules
};