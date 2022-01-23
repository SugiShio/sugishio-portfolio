<template lang="pug">
.s-index
  transition-group.s-index__image-container(name='fade')
    template(v-for='(image, index) in images')
      .s-index__image(
        v-show='imageIndex === index'
        :key='image'
        :style='{ backgroundImage: `url(${image})` }')
  section.s-index__section
    ul.s-index__articles
      li.s-index__article(v-for='article in articles')
        nuxt-link(:to='{ name: "articles-id", params: { id: article.id }}')
          time.s-index__article-time {{ article.createdAtText }}
          div {{ article.title }}
    .s-index__link(v-if='articles.length')
      nuxt-link(:to='{ name: "articles"}') more
  section.s-index__section(v-if='profile')
    profile-card(:profile='profile')

</template>

<script>
import Article from '~/models/article'
import profileCard from '~/components/molecules/profileCard.vue'
let db = null
let imageLotatorTimer = null

export default {
  name: 'PageIndex',
  components: { profileCard },
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
      const storage = this.$fire.storage
      const storageRef = storage.ref()
      db.collection('images')
        .where('aspect', '==', 'wide')
        .get()
        .then((images) => {
          images.forEach((image) => {
            storageRef
              .child(image.data().filePath)
              .getDownloadURL()
              .then((url) => {
                this.images.push(url)
              })
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
    height: 41.4vw;
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
  &__article {
    margin: 20px 0;
  }
  &__article-time {
    display: block;
    font-size: 10px;
  }
}
</style>
