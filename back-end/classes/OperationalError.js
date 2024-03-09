export default class OperationalError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.type = 'OpErr';
  }
}
