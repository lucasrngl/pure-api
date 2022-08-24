import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PersonRepository } from '../repositories/personRepository.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const filePath = join(currentDir, './../../database', 'data.json');
const personRepository = new PersonRepository(filePath);

class PersonService {
  static async findAll() {
    const people = await personRepository.find();
    return people;
  }

  static async findById(id) {
    const person = await personRepository.findById(id);
    return person;
  }

  static async create(data) {
    const person = await personRepository.create(data);
    return person;
  }

  static async update(id, data) {
    let person = await this.findById(id);
    if (person === undefined) {
      return new Error('Person does not exists');
    }
    person = {
      ...person,
      ...data,
    };
    const updatedPerson = await personRepository.update(person);
    return updatedPerson;
  }

  static async delete(id) {
    const person = await this.findById(id);
    if (person === undefined) {
      return new Error('Person does not exists');
    }
    await personRepository.delete(id);
    return;
  }
}

export { PersonService };
