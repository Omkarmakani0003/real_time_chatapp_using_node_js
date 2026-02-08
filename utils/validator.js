const { body } = require("express-validator");

exports.UserValidation = [
    body('fullName').notEmpty().trim().withMessage('Full name is required'),
    body('email').notEmpty().trim().withMessage('email is required'),
    body('contact').notEmpty().trim().withMessage('contact is required'),
    body('password').notEmpty().trim().withMessage('password is required'),
    body('agreement').notEmpty().withMessage('Please agree with our Terms and Privacy Policy'),
]

