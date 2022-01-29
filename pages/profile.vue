<template lang="pug">
section.s-profile(v-if='profile')
  .s-profile__name {{ profile.displayName }}
  .s-profile__copy {{ profile.copy }}
  .s-profile__body(v-html='markedBody')
</template>

<script>
import DOMPurify from 'dompurify'
import marked from 'marked'

export default {
  name: 'PageProfile',
  data() {
    return {
      profile: null,
    }
  },
  computed: {
    markedBody() {
      return marked(
        DOMPurify.sanitize(this.profile.body.replace(/(\\n|<br>)/g, '\n'))
      )
    },
  },
  created() {
    this.$fire.firestore
      .collection('globalConfig')
      .doc('profile')
      .get()
      .then((doc) => {
        this.profile = doc.data()
      })
  }
}
</script>

<style lang="scss">
.s-profile {
  &__name {
    font-size: 24px;
  }
  &__copy {
    margin: 50px 0;
  }
  &__body {
    @extend .markdown;
  }
}
</style>
