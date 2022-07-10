export class MetaInformation {
  constructor(params = {}) {
    this.siteName = params.siteName || ''
    this.title = params.title || this.siteName
    this.description = params.description || ''
    this.url = params.url || ''
    this.type = params.type || ''
    this.image = params.image || ''
    this.twitterCard = params.twitterCard || 'summary_large_image'
    this.twitterSite = params.twitterSite || ''
  }

  get nuxtFormat() {
    const meta = []
    if (this.siteName) {
      meta.push({
        hid: 'og:site_name',
        property: 'og:site_name',
        content: this.siteName
      })
    }
    if (this.title) {
      meta.push({
        hid: 'og:title',
        property: 'og:title',
        content: this.title
      })
    }
    if (this.description) {
      meta.push({
        hid: 'description',
        name: 'description',
        content: this.description
      })
      meta.push({
        hid: 'og:description',
        property: 'og:description',
        content: this.description
      })
    }
    if (this.url) {
      meta.push({
        hid: 'og:url',
        property: 'og:url',
        content: this.url
      })
    }
    if (this.type) {
      meta.push({
        hid: 'og:type',
        property: 'og:type',
        content: this.type
      })
    }
    if (this.image) {
      meta.push({
        hid: 'og:image',
        property: 'og:image',
        content: this.image
      })
    }
    if (this.twitterCard) {
      meta.push({
        hid: 'twitter:card',
        property: 'twitter:card',
        content: this.twitterCard
      })
    }
    if (this.twitterSite) {
      meta.push({
        hid: 'twitter:site',
        property: 'twitter:site',
        content: this.twitterSite
      })
    }

    return meta
  }
}
