<template lang="pug">
article.s-article(v-if='article')
  h1.s-article__title {{ article.title }}
  .s-article__time
    template(v-if='article.updatedAtText') created at:&nbsp;
    time {{ article.createdAtText }}
  .s-article__time(v-if='article.updatedAtText')
    | updated at:&nbsp;
    time {{ article.updatedAtText }}

  section.s-article__body(v-html='markedBody')
  div author
  profile-card(v-if='profile' :profile='profile')

</template>

<script>
import DOMPurify from 'dompurify'
import marked from 'marked'
import Article from '~/models/article'
import profileCard from '~/components/molecules/profileCard.vue'
let db = null

export default {
  name: 'PageArticle',
  components: { profileCard },
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
@import '@/assets/stylesheets/utils';

.s-article {
  &__title {
    font-size: 24px;
  }
  &__time {
    display: block;
    font-size: 10px;
  }
  &__body {
    margin: 50px 0;
    @extend .markdown;
  }
}
</style>
