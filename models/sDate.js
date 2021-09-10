export default class SDate {
  constructor(timestamp = 0) {
    this.timestamp = timestamp
    this.dateObject = new Date(this.timestamp)
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
