export default class CrudOperator {
  constructor(Model) {
    this.Model = Model;
  }

  // creates a new document in the database
  async create(data) {
    const doc = await this.Model.create(data);
    return doc;
  }
}
