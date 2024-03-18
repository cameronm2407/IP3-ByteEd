import catchAsyncError from '../utilities/catchAsyncError.js';

export default class videoController {
  constructor(crudOperator, searchEngine) {
    this.crudOperator = crudOperator;
    this.searchEngine = searchEngine;
  }

  search() {
    return catchAsyncError(async (req, res) => {
      const { st } = req.query;
      const searchResult = await this.searchEngine.searchAndCompile(st);
      res.status(200).json({ status: 'success', searchResult });
    });
  }

  uploadMetadata() {
    return catchAsyncError(async (req, res) => {
      const { body } = req;
      const metaData = await this.crudOperator.create(body);
      res.status(200).json({ status: 'success', metaData });
    });
  }
}
