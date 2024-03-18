export default class CrudOperator {
  constructor(Model) {
    this.Model = Model;
  }

  // creates a new document in the database
  create(data, many) {
    const doc = !many ? this.Model.create(data) : this.Model.insertMany(data);
    return doc;
  }

  // retrieves a single document specified by a query
  read(query) {
    const doc = this.Model.find(query);
    return doc;
  }

  // updates a single document by id in the database
  update(id, data) {
    const updatedDoc = this.Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return updatedDoc;
  }

  // deletes a single document by id from the database
  delete(id) {
    return this.Model.findByIdAndDelete(id);
  }

  /* 
  queries the database and returns documents where a specified
  field value has an approximate match to the search term
  */
  fullTextSearch(searchTerm, index, fields) {
    const pipeline = [
      {
        $search: {
          index: index,
          text: {
            query: searchTerm,
            path: [...fields],
            fuzzy: {},
          },
        },
      },
      {
        $limit: 20,
      },
    ];
    const result = this.Model.aggregate(pipeline);
    return result;
  }
}
