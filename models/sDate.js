import dayjs from 'dayjs'

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

  formattedDate(format = 'YYYY.M.D') {
    return dayjs(this.dateObject).format(format)
  }
}
