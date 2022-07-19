<template lang="pug">
section.s-admin-articles
  ul
    li.s-admin-articles__item(v-for='article in articles')
      nuxt-link.s-admin-articles__link(:to='goToDetail(article.id)')
        .s-admin-articles__article-title
          | {{ article.title }}
          span.s-admin-articles__lock(v-if='article.isPasswordRequired')
            i.icon-lock
        time.s-admin-articles__article-row {{ createdAtText(article) }}
</template>

<script>
import Article from '~/models/article'

let db = null

export default {
  name: 'PagesAdminArticles',
  layout: 'admin',
  data() {
    return {
      articles: []
    }
  },
  created() {
    db = this.$fire.firestore
    this.fetchArticles()
  },
  methods: {
    createdAtText(article) {
      return article.createdAt.formattedDate('YYYY/MM/DD HH:hh')
    },
    goToDetail(id) {
      return { name: 'admin-articles-id', params: { id } }
    },
    fetchArticles() {
      db.collection('articles')
        .orderBy('createdAt')
        .get()
        .then((articles) => {
          articles.forEach((article) => {
            this.articles.push(
              new Article({ id: article.id, ...article.data() })
            )
          })
        })
    }
  }
}
</script>

<style lang="scss">
.s-admin-articles {
  &__link {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: $color-tokinezu;
    }
  }

  &__article-title,
  &__article-row {
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__article-title {
    flex-grow: 1;
  }

  &__article-row {
    flex-shrink: 0;
    min-width: 20%;
  }

  &__lock {
    vertical-align: middle;
    margin-left: 5px;
  }
}
</style>
