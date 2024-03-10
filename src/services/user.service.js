const { User } = require('../models');
const ApiError = require('../utils/catchAPIError');

const createUser = async userBody => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(400, 'Email already taken');
  }
  return User.create({ ...userBody, role: 'customer', isEmailVerified: true });
};
const getUserByEmail = async email => {
  return User.findOne({ email });
};

module.exports = { createUser, getUserByEmail };
