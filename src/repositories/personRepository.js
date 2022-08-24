import { readFile, writeFile } from 'node:fs/promises';

class PersonRepository {
  constructor(file) {
    this.file = file;
  }

  async #currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  async find() {
    const result = await this.#currentFileContent();
    return result;
  }

  async findById(id) {
    const currentFile = await this.#currentFileContent();
    const result = currentFile.filter((obj) => obj.id === id)[0];
    return result;
  }

  async create(data) {
    const currentFile = await this.#currentFileContent();
    currentFile.push(data);
    await writeFile(this.file, JSON.stringify(currentFile));
    return data;
  }

  async update(data) {
    const currentFile = await this.#currentFileContent();
    const index = currentFile.map((obj) => obj.id).indexOf(data.id);
    currentFile.splice(index, 1, data);
    await writeFile(this.file, JSON.stringify(currentFile));
    return data;
  }

  async delete(id) {
    const currentFile = await this.#currentFileContent();
    const index = currentFile.map((obj) => obj.id).indexOf(id);
    currentFile.splice(index, 1);
    await writeFile(this.file, JSON.stringify(currentFile));
    return;
  }
}

export { PersonRepository };
