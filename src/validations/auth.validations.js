const Joi = require('joi');

const registerUserValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(8) // Password must be at least 8 characters long
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\|[\]\/~])/,
      { name: 'password' }
    )
    .error(
      new Error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
      )
    ),
  name: Joi.string().required()
});

const loginUserValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required()
});
const refreshTokenValidation = Joi.object().keys({
  user_id: Joi.string().required(),
  refresh_token: Joi.string().required()
});
module.exports = {
  registerUserValidation,
  loginUserValidation,
  refreshTokenValidation
};
