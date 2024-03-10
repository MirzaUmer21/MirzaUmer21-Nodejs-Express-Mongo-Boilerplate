const { validateUserCredentials } = require('../services/auth.service');
const {
  generateAuthTokens,
  deleteTokenByUser
} = require('../services/token.service');
const { createUser } = require('../services/user.service');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  const user = await createUser(req.body);
  const tokens = await generateAuthTokens(user);
  res.status(200).send({ user, tokens });
});
const login = catchAsync(async (req, res) => {
  const user = await validateUserCredentials(req.body);
  const tokens = await generateAuthTokens(user);
  res.status(200).send({ tokens });
});
const logout = catchAsync(async (req, res) => {
  const user_id = req.params.id;
  const result = await deleteTokenByUser(user_id);
  if (result) {
    res.status(200).send({ message: 'Logged Out Successfully' });
  }
});
const refresh_user_token = catchAsync(async (req, res) => {
  const { user_id, refresh_token } = req.body;
  const result = await deleteTokenByUser(user_id);
  if (result) {
    res.status(200).send({ message: 'Logged Out Successfully' });
  }
});
module.exports = { register, login, logout, refresh_user_token };
