<template lang="pug">
article.s-article(v-if='article')
  h1.s-article__title {{ article.title }}
  ul.s-article__tags(v-if='article.tags.length')
    li.s-article__tag(v-for='tag in article.tags')
      atoms-tag(:text='tag', @click='goToArticles(tag)')
  .s-article__time
    template(v-if='article.updatedAtText') created at:&nbsp;
    time {{ article.createdAtText }}
  .s-article__time(v-if='article.updatedAtText')
    | updated at:&nbsp;
    time {{ article.updatedAtText }}

  section.s-article__body(v-html='markedBody')

  section.s-article__author
    h2.s-article__label author
    .s-article__profile
      molecules-profile-card(v-if='profile', :profile='profile')
</template>

<script>
import DOMPurify from 'dompurify'
import marked from 'marked'
import Article from '~/models/article'

let db = null

export default {
  name: 'PagesArticlesId',
  data() {
    return {
      article: null,
      profile: null,
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
    this.fetchArticle(this.$route.params.id)
    this.fetchGlobalConfig('profile')
  },
  methods: {
    goToArticles(tag) {
      this.$router.push({ name: 'articles', query: { tag } })
    },
    fetchArticle(id) {
      db.collection('articles')
        .doc(id)
        .get()
        .then((article) => {
          this.article = new Article({ id: article.id, ...article.data() })
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
.s-article {
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
