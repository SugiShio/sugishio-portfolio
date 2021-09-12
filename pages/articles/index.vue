<template lang="pug">
.s-articles
  section.s-articles__section
    ul.s-articles__articles
      li.s-articles__article(v-for='article in articles')
        nuxt-link(:to='{ name: "articles-id", params: { id: article.id }}')
          time.s-articles__article-time {{ article.createdAtText }}
          div {{ article.title }}
  section.s-articles__section(v-if='profile')
    profile-card(:profile='profile')

</template>

<script>
import Article from '~/models/article'
import profileCard from '~/components/molecules/profileCard.vue'
let db = null

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
  created() {
    db = this.$fire.firestore
    this.fetchArticles()
    this.fetchGlobalConfig('profile')
  },
  methods: {
    fetchArticles() {
      db.collection('articles')
        .limit(3)
        .orderBy('publishedAt')
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
.s-articles {
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
