<template lang="pug">
div hello, {{ displayName }}!
</template>

<script>
export default {
  name: 'PagesAdmin',
  layout: 'admin',
  computed: {
    displayName() {
      const user = this.$store.state.admin.user
      return user && user.displayName
    },
  },
}
</script>
