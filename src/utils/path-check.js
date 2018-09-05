import ROUTES from '../routes';

const availableRoutes = new Map();

Object.keys(ROUTES).forEach((key) => {
  availableRoutes.set(ROUTES[key], key);
});

const pathCheck = (path) => {
  const destination = availableRoutes.get(path);

  return destination ? ROUTES[destination] : ROUTES.NOTFOUND;   
};

export default pathCheck;
