const express = require('express');
const router = express.Router();
const { register_route } = require('../../../utils/register.routes');

const routes = [
  {
    route: '/login',
    auth_enable: true,
    methods: [
      {
        method: 'POST',
        handler: (req, res, next) => res.status(200).json('hello')
      }
    ]
  }
];
register_route(router, routes);
module.exports = router;
