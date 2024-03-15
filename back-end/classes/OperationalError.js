export default class OperationalError extends Error {
  constructor(message) {
    super(message);
    this.type = 'OpErr';
  }
}
