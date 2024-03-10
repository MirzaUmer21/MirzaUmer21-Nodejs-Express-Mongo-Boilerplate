const moment = require('moment');
const { tokenTypes } = require('../config/token');
const config = require('../config');
const jwt = require('jsonwebtoken');
const { Token } = require('../models');
const ApiError = require('../utils/catchAPIError');

const verifyToken = async (token, type, user_id) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: user_id,
    blacklisted: false
  });
  if (!tokenDoc) {
    throw new ApiError(400, 'Invalid Token');
  }
  return tokenDoc;
};
const findTokenByUser = async id => {
  const token = await Token.find({ user: id });
  return token;
};
const deleteTokenByUser = async id => {
  const token = await Token.deleteMany({ user: id });
  return token;
};
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
};
const saveToken = async (
  refresh_token,
  userId,
  expires,
  type,
  blacklisted = false
) => {
  const tokenDoc = await Token.create({
    refresh_token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted
  });
  return tokenDoc;
};
const generateRefreshAccessToken = async (refresh_token, user_id) => {
  const isValidToken = verifyToken(refresh_token, 'refresh', user_id);
  console.log(isValidToken);
};
const generateAuthTokens = async user => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );

  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access_token: accessToken,
    refresh_token: refreshToken
  };
};

module.exports = {
  verifyToken,
  generateAuthTokens,
  findTokenByUser,
  deleteTokenByUser,
  generateRefreshAccessToken
};
