const { ValidationError } = require('joi');

const validate = schema => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    let errorMessage = 'Validation error';
    if (error.details) {
      // If error.details is available, extract error messages
      errorMessage = error.details.map(detail => detail.message).join(', ');
    } else if (error.message) {
      // If error.message is available, use it as the error message
      errorMessage = error.message;
    }

    return res.status(400).json({ message: errorMessage });
  }
  next();
};

module.exports = validate;
