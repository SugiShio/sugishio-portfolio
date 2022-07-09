<template lang="pug">
article.s-article(v-if='article')
  template(v-if='!isPermitted')
    .s-article__password-title
      | Password
    .s-article__password-form
      input.s-article__password-input(
        type='password',
        v-model='password',
        @keyup.enter='submitPassword'
      )
      button.s-article__password-button(type='button', @click='submitPassword')
        i.icon-plane
        //- img(src='~/assets/images/plane.svg')
    p.s-article__error
      transition(name='fade')
        span(v-show='!isPasswordValid')
          | パスワードが違います

  template(v-else-if='isPermitted')
    h1.s-article__title {{ article.title }}
      span.s-article__lock(v-if='article.isPasswordRequired')
        i.icon-lock

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
import Article from '~/models/article'
import { Text } from '~/utils/text'

let db = null
const getCookieValue = (key) => {
  const cookies = document.cookie
  const cookiesArray = cookies.split(';')
  const result = cookiesArray.find((cookie) => {
    return cookie.split('=')[0] === key
  })
  return result ? result.split('=')[1] : undefined
}

export default {
  name: 'PagesArticlesId',
  async asyncData({ app, route }) {
    db = app.$fire.firestore
    const id = route.params.id
    let article = ''

    await db
      .collection('articles')
      .doc(id)
      .get()
      .then((doc) => {
        article = new Article({ id: doc.id, ...doc.data() })
      })
    return { article }
  },
  data() {
    return {
      isPasswordValid: true,
      isPermitted: true,
      password: '',
      profile: null,
    }
  },
  head() {
    return {
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.article.title },
      ],
    }
  },
  computed: {
    markedBody() {
      return Text.markText(this.article.body)
    },
  },
  created() {
    this.setIsPermitted()
    this.fetchGlobalConfig('profile')
  },
  methods: {
    goToArticles(tag) {
      this.$router.push({ name: 'articles', query: { tag } })
    },
    fetchGlobalConfig(docId) {
      db.collection('globalConfig')
        .doc(docId)
        .get()
        .then((doc) => {
          this.profile = doc.data()
        })
    },
    setIsPermitted() {
      const cookieKey = `SugiShioPortfolioArticle-${this.article.id}`
      this.isPermitted =
        getCookieValue(cookieKey) === this.article.password ||
        !this.article.isPasswordRequired
    },
    submitPassword() {
      this.isPasswordValid = this.password === this.article.password
      if (!this.isPasswordValid) return

      const name = `SugiShioPortfolioArticle-${this.article.id}`
      const value = this.password
      const maxAge = 60 * 60 * 24 * 7 // 1週間
      document.cookie = `${name}=${value}; max-age=${maxAge}`

      this.isPermitted = true
    },
  },
}
</script>

<style lang="scss">
.s-article {
  &__password-title {
    text-align: center;
    margin: 30px 0;
  }

  &__password-form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__password-input {
    @extend %input;

    width: 200px;
  }

  &__password-button {
    margin-left: 15px;
    color: $color-theme;
    font-size: 20px;
    line-height: 1;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.5;
    }
  }

  &__error {
    height: 1.6em;
    margin: 10px 0;
    text-align: center;
    color: $color-jinzamomi;
    font-size: 13px;

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.2s ease;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
  }

  &__title {
    font-size: 24px;
  }

  &__lock {
    vertical-align: middle;
    margin-left: 5px;
    font-size: 20px;
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
