export default class searchEngine {
  constructor(videoOperator, courseOperator) {
    this.videoOperator = videoOperator;
    this.courseOperator = courseOperator;
  }

  searchVideos(searchTerm) {
    return this.videoOperator.fullTextSearch(searchTerm, 'video_search', [
      'title',
      'description',
    ]);
  }

  searchCourses(searchTerm) {
    return this.courseOperator.fullTextSearch(searchTerm, 'course_search', [
      'name',
      'description',
      'programming_language',
      'tags',
    ]);
  }

  async searchAndCompile(searchTerm) {
    const videoPromiseLike = this.searchVideos(searchTerm);
    const coursePromiseLike = this.searchCourses(searchTerm);
    const compiledResult = (
      await Promise.all([videoPromiseLike, coursePromiseLike])
    ).flat();
    return compiledResult;
  }
}
