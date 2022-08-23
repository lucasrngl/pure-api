import { parse } from 'node:url';

const routes = {
  ...peopleRoute,
  default: (request, response) => {
    response.writeHead(404, { 'content-type': 'application/json' });
    response.write('Not found');
    response.end();
  },
};

function handler(request, response) {
  const { url, method } = request;
  const { pathname: path } = parse(url);
  const key = `${path}:${method.toLowerCase()}`;
  const route = routes[key] || routes.default;
  return route(request, response);
}

export { handler };
