import { randomUUID } from 'crypto';

class Person {
  constructor({ name, email, age }) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.age = age;
  }
}

export { Person };
