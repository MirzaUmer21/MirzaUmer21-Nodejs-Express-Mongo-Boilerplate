const express = require('express');
const router = express.Router();
const { register_route } = require('../../../utils/register.routes');
const validate = require('../../../middleware/validate');
const authController = require('../../../contorllers/auth.controllers');
const {
  registerUserValidation,
  loginUserValidation,
  refreshTokenValidation
} = require('../../../validations/auth.validations');

const routes = [
  {
    route: '/register',
    middlewares: [validate(registerUserValidation)],
    methods: [
      {
        method: 'POST',
        handler: authController.register
      }
    ]
  },
  {
    route: '/login',
    middlewares: [validate(loginUserValidation)],
    methods: [
      {
        method: 'POST',
        handler: authController.login
      }
    ]
  },
  {
    route: '/refresh-token',
    middlewares: [validate(refreshTokenValidation)],
    methods: [
      {
        method: 'POST',
        handler: authController.refresh_user_token
      }
    ]
  },
  {
    route: '/logout/:id',
    methods: [
      {
        method: 'GET',
        handler: authController.logout
      }
    ]
  }
];

register_route(router, routes);
module.exports = router;
