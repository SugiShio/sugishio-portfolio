<template lang="pug">
.s-articles
  h1.s-articles__title {{ title }}
  section.s-articles__section
    ul.s-articles__articles(v-if='articles.length')
      li.s-articles__article(v-for='article in articles')
        nuxt-link(:to='{ name: "articles-id", params: { id: article.id } }')
          time.s-articles__article-time {{ article.publishedAtText }}
          div {{ article.title }}

    .s-articles__articles(v-else) 記事がありません
  section.s-articles__section(v-if='profile')
    molecules-profile-card(:profile='profile')
</template>

<script>
import Article from '~/models/article'
let db = null

export default {
  name: 'PagesArticlesIndex',
  data() {
    return {
      profile: null,
      images: [],
      imageIndex: 0,
      articles: [],
    }
  },
  computed: {
    title() {
      const tag = this.$route.query.tag
      return tag ? `Tag: ${tag}` : 'Articles'
    },
  },
  created() {
    db = this.$fire.firestore
    this.fetchArticles()
    this.fetchGlobalConfig('profile')
  },
  methods: {
    fetchArticles() {
      const tag = this.$route.query.tag
      let query = db
        .collection('articles')
        .where('isDraft', '==', false)
        .where('password', '==', '')
      if (tag) {
        query = query.where('tags', 'array-contains', tag)
      }
      query = query
        .orderBy('publishedAt', 'desc')
        .limit(10)
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
