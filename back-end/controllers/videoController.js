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

  uploadMetadata(many) {
    return catchAsyncError(async (req, res, next) => {
      const { body } = req;
      const metaData = await this.crudOperator.create(body, many);

      if (!many) return res.status(200).json({ status: 'success', metaData });
      req.uploadedMetadata = metaData;
      next();
    });
  }

  getVideos() {
    return catchAsyncError(async (req, res) => {
      let query = req.query ? req.query : {};
      if (query.id) {
        query._id = query.id;
        delete query.id;
      }
      if (query['$in']) {
        const ids = query['$in'].split(',');
        query = {
          _id: { $in: ids },
        };
      }
      const videos = await this.crudOperator.read(query);
      res.status(200).json({ status: 'success', videos });
    });
  }

  update() {
    return catchAsyncError(async (req, res) => {
      const data = req.body;
      const { id } = req.query;
      const updated = await this.crudOperator.update(id, data);
      res.status(200).json({ status: 'success', updated });
    });
  }

  delete() {
    return catchAsyncError(async (req, res) => {
      const { id } = req.query;
      await this.crudOperator.delete(id);
      res.status(204).end();
    });
  }
  getViews() {
    return catchAsyncError(async (req, res) => {
      const { id } = req.query;
      const video = await this.crudOperator.read({ _id: id });
      res.status(200).json({ status: 'success', views: video.views });
    });
  }

  updateViews() {
    return catchAsyncError(async (req, res) => {
      const { id } = req.query;
      const updatedVideo = await this.crudOperator.update(id, { $inc: { views: 1 } });
      res.status(200).json({ status: 'success', views: updatedVideo.views });
    });
  }
}