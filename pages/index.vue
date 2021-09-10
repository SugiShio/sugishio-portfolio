<template lang="pug">
main.s-index
  .s-index__image
    img(:src='src')
  section.s-index__section
    ul.s-index__articles
      li.s-index__article(v-for='article in articles')
        nuxt-link(:to='{ name: "articles-id", params: { id: article.id }}')
          time.s-index__article-time {{ article.createdAtText }}
          div {{ article.title }}
  section.s-index__section(v-if='profile')
    profile-card(:profile='profile')

</template>

<script>
import Article from '~/models/article'
import Image from '~/models/image'
import profileCard from '~/components/molecules/profileCard.vue'
let db = null

export default {
  name: 'PageIndex',
  components: { profileCard },
  data() {
    return {
      profile: null,
      images: [],
      articles: [],
    }
  },
  computed: {
    src() {
      return this.images.length ? this.images[0].url : ''
    },
  },
  created() {
    db = this.$fire.firestore
    this.fetchImages()
    this.fetchArticles()
    this.fetchGlobalConfig('profile')
  },
  methods: {
    fetchArticles() {
      db.collection('articles')
        .limit(3)
        .orderBy('publishedAt')
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
      db.collection('images')
        .get()
        .then((images) => {
          images.forEach((image) => {
            this.images.push(new Image(image.data()))
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
  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 41.4vw;
    overflow: hidden;

    img {
      width: 100%;
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
