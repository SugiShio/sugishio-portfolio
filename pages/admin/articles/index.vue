<template lang="pug">
section.s-admin-articles
  ul
    li(v-for='article in articles', @click='goToDetail(article.id)')
      | {{ article.title }}
</template>

<script>
import DOMPurify from 'dompurify'
import marked from 'marked'
import Article from '~/models/article'

let db = null

export default {
  name: 'PagesAdminArticles',
  layout: 'admin',
  data() {
    return {
      articles: [],
    }
  },
  computed: {
    markedBody() {
      return marked(
        DOMPurify.sanitize(this.article.body.replace(/(\\n|<br>)/g, '\n'))
      )
    },
  },
  created() {
    db = this.$fire.firestore
    this.fetchArticles()
  },
  methods: {
    goToDetail(id) {
      this.$router.push({ name: 'admin-articles-id', params: { id } })
    },
    fetchArticles() {
      db.collection('articles')
        .get()
        .then((articles) => {
          articles.forEach((article) => {
            this.articles.push(
              new Article({ id: article.id, ...article.data() })
            )
          })
        })
    },
  },
}
</script>

<style lang="scss">
.s-admin-article {
  &__title {
    font-size: 24px;
  }
  &__tags {
    margin: 5px 0;
  }
  &__tag {
    display: inline-block;
    & + & {
      margin-left: 10px;
    }
  }
  &__time {
    display: block;
    font-size: 13px;
  }
  &__body {
    margin: 50px 0;
    @extend .markdown;
  }
  &__author {
    margin: 50px 0;
  }
  &__label {
    display: block;
    font-size: 13px;
  }
  &__profile {
    margin: 10px 0;
  }
}
</style>
