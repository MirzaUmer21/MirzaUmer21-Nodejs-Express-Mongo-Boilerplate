const { default: mongoose } = require('mongoose');
const { tokenTypes } = require('../config/token');

const tokenSchema = mongoose.Schema(
  {
    refresh_token: {
      type: String,
      required: true,
      index: true
    },
    user: {
      // type: mongoose.SchemaTypes.ObjectId,
      type: String,

      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: [
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL
      ],
      required: true
    },
    expires: {
      type: Date,
      required: true
    },
    blacklisted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);
const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
