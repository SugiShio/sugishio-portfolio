<template lang="pug">
.s-index
  transition-group.s-index__image-container(name='fade')
    template(v-for='(image, index) in images')
      .s-index__image(
        v-show='imageIndex === index',
        :key='image',
        :style='{ backgroundImage: `url(${image})` }'
      )
  section.s-index__section
    ul.s-index__articles
      li.s-index__article(v-for='article in articles')
        nuxt-link(:to='{ name: "articles-id", params: { id: article.id } }')
          time.s-index__article-time {{ article.createdAtText }}
          div {{ article.title }}
    .s-index__link(v-if='articles.length')
      nuxt-link(:to='{ name: "articles" }') More articles
  section.s-index__section(v-if='profile')
    molecules-profile-card(:profile='profile')
</template>

<script>
import Article from '~/models/article'

let db = null
let imageLotatorTimer = null

export default {
  name: 'PagesIndex',
  data() {
    return {
      profile: null,
      images: [],
      imageIndex: 0,
      articles: [],
    }
  },
  async created() {
    db = this.$fire.firestore
    await this.fetchImages()
    this.setImageLotator()
    this.fetchArticles()
    this.fetchGlobalConfig('profile')
  },
  beforeDestroy() {
    clearInterval(imageLotatorTimer)
  },
  methods: {
    setImageLotator() {
      imageLotatorTimer = setInterval(() => {
        this.imageIndex = (this.imageIndex + 1) % this.images.length
      }, 8000)
    },
    fetchArticles() {
      db.collection('articles')
        .limit(3)
        .orderBy('publishedAt', 'desc')
        .where('isDraft', '==', false)
        .where('password', '==', '')
        .get()
        .then((articles) => {
          articles.forEach((article) => {
            this.articles.push(
              new Article({ id: article.id, ...article.data() })
            )
          })
        })
    },
    fetchImages() {
      const aspect = window.innerWidth < 600 ? 'square' : 'wide'
      db.collection('images')
        .where('aspect', '==', aspect)
        .get()
        .then((images) => {
          images.forEach((image) => {
            const url = image.data().url
            this.images.push(url)
          })
        })
    },
    fetchGlobalConfig(docId) {
      db.collection('globalConfig')
        .doc(docId)
        .get()
        .then((doc) => {
          this.profile = doc.data()
        })
    },
  },
}
</script>

<style lang="scss">
.s-index {
  &__image-container {
    display: block;
    position: relative;
    height: calc(100vw - 80px);
    background-color: #f5f5f5;

    @include screen-pc {
      max-height: calc(162vh * 0.414);
      height: 41.4vw;
    }
  }

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 1s ease;
    }

    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }
  }

  &__section {
    margin: 80px 0;
  }

  &__link {
    a {
      position: relative;
      padding-right: 20px;
      transition: opacity 0.3s;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: -3px;
        right: 3px;
        margin: auto;
        width: 7px;
        height: 7px;
        border-top: 1px solid $color-text-weak;
        border-right: 1px solid $color-text-weak;
        transform: rotate(45deg);
      }
    }
  }

  &__article,
  &__link {
    margin: 20px 0;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.6;
    }
  }

  &__article-time {
    display: block;
    font-size: 10px;
  }
}
</style>
