const ApiError = require('../utils/catchAPIError');
const { getUserByEmail } = require('./user.service');

const validateUserCredentials = async user => {
  const validUser = await getUserByEmail(user.email);
  if (validUser && (await validUser.isPasswordMatch(user.password))) {
    return validUser;
  }
  throw new ApiError(400, 'Wrong Credentials');
};
module.exports = { validateUserCredentials };
