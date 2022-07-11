const META_INFORMATION_SETS = [
  { key: 'siteName', regex: /.*site_name$/ },
  { key: 'title', regex: /.*title$/ },
  { key: 'description', regex: /.*description$/ },
  { key: 'url', regex: /.*url$/ },
  { key: 'type', regex: /.*type$/ },
  { key: 'image', regex: /.*image$/ },
  {
    key: 'twitterCard',
    regex: /^twitter:card$/,
    defaultValue: 'summary_large_image'
  },
  { key: 'twitterSite', regex: /^twitter:site$/ }
]
export class MetaInformation {
  constructor(params = {}) {
    META_INFORMATION_SETS.forEach((item) => {
      this[item.key] = params[item.key] || item.defaultValue || null
    })
  }

  marge(params = {}) {
    META_INFORMATION_SETS.forEach((item) => {
      if (params[item.key]) {
        this[item.key] = params[item.key]
      }
    })
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

  static metaInformationFromHeadConfig(headConfig) {
    const metaInformation = {}
    const reversedHeadConfig = headConfig.reverse()
    META_INFORMATION_SETS.forEach((set) => {
      const item = reversedHeadConfig.find((configItem) =>
        set.regex.test(configItem.hid)
      )
      metaInformation[set.key] = item ? item.content : ''
    })

    return new this(metaInformation)
  }
}
