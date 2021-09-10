<template lang="pug">
section.s-profile(v-if='profile')
  .s-profile__name {{ profile.displayName }}
  .s-profile__copy {{ profile.copy }}

</template>

<script>
export default {
  name: 'PageProfile',
  data() {
    return {
      profile: null,
    }
  },
  created() {
    this.$fire.firestore
      .collection('globalConfig')
      .doc('profile')
      .get()
      .then((doc) => {
        this.profile = doc.data()
      })
  },
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
}
</style>
