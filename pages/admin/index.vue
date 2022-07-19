<template lang="pug">
.p-admin
  .p-admin__greeting hello, {{ displayName }}!
  nav
    ul
      li
        nuxt-link(:to='{ name: "admin-articles" }') Articles
</template>

<script>
export default {
  name: 'PagesAdmin',
  layout: 'admin',
  computed: {
    displayName() {
      const user = this.$store.state.admin.user
      return user && user.displayName
    }
  },
  methods: {
    goToArticles() {
      this.$router.push({
        name: 'admin-articles'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.p-admin {
  &__greeting {
    padding: 10px 20px;
    border: 1px solid $color-tokinezu;
    border-radius: 5px;
    box-shadow: 0 0 5px $color-tokinezu;
  }
}
</style>
