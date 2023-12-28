class Router {
  _routes = new Map();

  addRoute(url, method, controller) {
    const key = method.toUpperCase() + url;
    this._routes.set(key, controller);
  }

  get routes() {
    return this._routes;
  }
}

export const router = new Router();
