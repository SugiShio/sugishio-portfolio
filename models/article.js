import SDate from '~/models/sDate'

const getBooleanValue = (value) => {
  return typeof value === 'boolean' ? value : true
}

export default class Article {
  constructor(params = {}) {
    this.id = params.id
    this.title = params.title || 'no title'
    this.body = params.body ? params.body.replace(/\\n/g, '\n') : ''
    this.tags = params.tags || []
    this.isDraft = getBooleanValue(params.isDraft)
    this.createdAt = new SDate(
      params.createdAt && params.createdAt.seconds * 1000
    )
    if (params.publishedAt) {
      this.publishedAt = new SDate(params.publishedAt.seconds * 1000)
    }
    if (params.updatedAt) {
      this.updatedAt = new SDate(params.updatedAt.seconds * 1000)
    }
  }

  get createdAtText() {
    return this.createdAt.dateText
  }

  get publishedAtText() {
    return this.publishedAt.dateText
  }

  get updatedAtText() {
    return this.updatedAt && this.updatedAt.dateText
  }

  get postFormat() {
    const result = {}
    Object.keys(this)
      .filter((key) => this[key] !== undefined)
      .forEach((key) => {
        if (this[key].dateObject) result[key] = this[key].dateObject
        else if (Array.isArray(this[key])) {
          result[key] = this[key].filter((v) => v)
        } else result[key] = this[key]
      })
    return result
  }
}
