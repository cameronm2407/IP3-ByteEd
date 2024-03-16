export default class CrudOperator {
  constructor(Model) {
    this.Model = Model;
  }

  // creates a new document in the database
  async create(data) {
    const doc = await this.Model.create(data);
    return doc;
  }

  // retrieves a single document specified by a query
  async read(query) {
    const doc = await this.Model.find(query);
    return doc;
  }

  // updates a single document by id in the database
  async update(id, data) {
    const updatedDoc = await this.Model.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedDoc;
  }

  // deletes a single document by id from the database
  async delete(id) {
    const docDeleted = await this.Model.findByIdAndDelete(id);
    return docDeleted;
  }

  /* 
  queries the database and returns documents where a specified
  field value has an approximate match to the search term
  */
  async fullTextSearch(searchTerm, index, fields) {
    const pipeline = [
      {
        $search: {
          index,
          text: {
            query: searchTerm,
            path: [...fields],
            fuzzy: {},
          },
        },
      },
    ];
    const result = await this.Model.aggregate(pipeline);
    return result;
  }
}
