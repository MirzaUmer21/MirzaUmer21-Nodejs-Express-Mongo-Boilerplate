const register_route = (router, routes = []) => {
  routes.forEach(({ route, middlewares = [], methods = [] }) => {
    methods.forEach(({ method, handler }) => {
      if (!method || !handler) {
        return;
      }
      router[method.toLowerCase()](route, ...middlewares, handler);
    });
  });
};

module.exports = {
  register_route
};
