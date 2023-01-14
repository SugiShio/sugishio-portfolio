<template lang="pug">
.s-l-admin
  header
    div(v-if='isSignin', @click='signOut')
      | {{ displayName }}
    div(v-else, @click='goToSignin')
      | Signin
  main.s-l-admin__main
    nuxt(v-if='isSignin')
</template>

<script>
export default {
  name: 'LayoutsAdmin',
  computed: {
    isSignin() {
      return this.$store.getters['admin/isSignin']
    },
    displayName() {
      const user = this.$store.state.admin.user
      return user && user.displayName
    },
  },
  async created() {
    const auth = this.$fire.auth
    await auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('admin/updateUser', { user })
      } else if (this.$route.name !== 'admin-signin') {
        this.$router.push({
          name: 'admin-signin',
          params: { redirect: this.$route.name },
        })
      }
    })
  },
  methods: {
    goToSignin() {
      this.$router.push({
        name: 'admin-signin'
      })
    },
    signOut() {
      this.$fire.auth.signOut()
    }
  }
}
</script>

<style lang="scss">
.s-l-admin {
  &__main {
    padding: 80px 30px;

    @include screen-pc {
      padding: 80px;
    }
  }
}
</style>
