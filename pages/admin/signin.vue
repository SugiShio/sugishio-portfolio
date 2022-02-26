<template lang="pug">
div
  div
    | {{ errorMessage }}
  div
    input(v-model='email')
  div
    input(type='password', v-model='password')
  div(@click='signin') signin
</template>
<script>
export default {
  name: 'PagesAdminSignin',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    signin() {
      if (!this.email || !this.password) return
      const auth = this.$fire.auth
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({
            name: 'admin',
          })
        })
        .catch((error) => {
          this.errorMessage = error.message
          console.error(error)
        })
    },
  },
}
</script>
