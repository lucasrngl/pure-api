import { once } from 'node:events';
import { parse } from 'node:url';
import { Person } from '../entities/Person.js';
import { PersonService } from '../services/personService.js';

const HEADER = { 'content-type': 'application/json' };

const routes = {
  '/people:get': async (request, response) => {
    const people = await PersonService.findAll();
    response.writeHead(200, HEADER);
    response.write(JSON.stringify({ people }));
    return response.end();
  },
  '/people:post': async (request, response) => {
    const data = await once(request, 'data');
    const items = JSON.parse(data);
    const person = new Person(items);
    const result = await PersonService.create(person);
    response.writeHead(201, HEADER);
    response.write(JSON.stringify({ result }));
    return response.end();
  },
  '/people:put': async (request, response) => {
    const { url } = request;
    const { query } = parse(url);
    const [, id] = query.split('id=');
    const data = await once(request, 'data');
    const items = JSON.parse(data);
    const result = await PersonService.update(id, items);
    if (result instanceof Error) {
      response.writeHead(400, HEADER);
      response.write(JSON.stringify({ error: result.message }));
      return response.end();
    }
    response.writeHead(201, HEADER);
    response.write(JSON.stringify({ result }));
    return response.end();
  },
  '/people:delete': async (request, response) => {
    const { url } = request;
    const { query } = parse(url);
    const [, id] = query.split('id=');
    const result = await PersonService.delete(id);
    if (result instanceof Error) {
      response.writeHead(400, HEADER);
      response.write(JSON.stringify({ error: result.message }));
      return response.end();
    }
    response.writeHead(204, HEADER);
    return response.end();
  },
};

export default routes;
