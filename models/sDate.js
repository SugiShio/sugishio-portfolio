export default class SDate {
  constructor(timestamp) {
    this.timestamp = timestamp
    this.dateObject = timestamp ? new Date(timestamp) : new Date()
  }

  get year() {
    return this.dateObject.getFullYear()
  }

  get month() {
    return this.dateObject.getMonth() + 1
  }

  get date() {
    return this.dateObject.getDate()
  }

  get day() {
    return this.dateObject.getDay()
  }

  get dateText() {
    return `${this.year}.${this.month}.${this.date}`
  }
}
