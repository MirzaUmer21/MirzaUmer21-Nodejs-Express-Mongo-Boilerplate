const v1_routes = app => {
  app.use('/v1/customer', require('./v1/customers/auth.routes'));
  app.use('/v1/admin', require('./v1/admin/auth.routes'));
};

module.exports = { v1_routes };
