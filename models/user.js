export default class User {
  constructor(params = {}) {
    this.id = params.id
    this.email = params.email || ''
    this.displayName = params.displayName || params.email || ''
  }
}
