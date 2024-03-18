import catchAsyncError from "../utilities/catchAsyncError.js";

export default class videoController {
  constructor(crudOperator, searchEngine) {
    this.crudOperator = crudOperator;
    this.searchEngine = searchEngine;
  }

  search() {
    return catchAsyncError(async (req, res) => {
      const { st } = req.query;
      const searchResult = await this.searchEngine.searchAndCompile(st);
      res.status(200).json({ status: "success", searchResult });
    });
  }

  uploadMetadata() {
    return catchAsyncError(async (req, res) => {
      const { body } = req;
      const metaData = await this.crudOperator.create(body);
      res.status(200).json({ status: "success", metaData });
    });
  }

  getVideos() {
    return catchAsyncError(async (req, res) => {
      const query = req.query ? req.query : {};
      const videos = await this.crudOperator.read(query);
      res.status(200).json({ status: "success", videos });
    });
  }

  update() {
    return catchAsyncError(async (req, res) => {
      const data = req.body;
      const { _id } = req.query;
      const updated = await this.crudOperator.update(_id, data);
      res.status(200).json({ status: "success", updated });
    });
  }

  delete() {
    return catchAsyncError(async (req, res) => {
      const { _id } = req.query;
      const deletedDoc = await this.crudOperator.delete(_id);
      res.status(200).json({ status: "success", deletedDoc });
    });
  }
}
