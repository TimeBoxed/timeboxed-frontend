import ROUTES from '../routes';

const availableRoutes = new Map();

Object.keys(ROUTES).forEach((key) => {
  availableRoutes.set(ROUTES[key], key);
});

const pathCheck = (path, hasToken) => {
  if (!hasToken) {
    if (path === ROUTES.SIGNUP) return path;
    return ROUTES.LANDING;
  }

  if (hasToken && path === ROUTES.LANDING) return ROUTES.DASHBOARD;

  const destination = availableRoutes.get(path);
  return destination ? ROUTES[destination] : ROUTES.NOT_FOUND;
};

export default pathCheck;
