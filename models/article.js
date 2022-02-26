import SDate from '~/models/sDate'

export default class Article {
  constructor(params = {}) {
    this.id = params.id
    this.title = params.title || 'no title'
    this.body = params.body || ''
    this.tags = params.tags || []
    this.isDraft = params.isDraft || true
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
}
