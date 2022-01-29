<template lang="pug">
  section.s-profile-card
    nuxt-link(:to='{ name: "profile"}')
      .s-profile-card__name {{ profile.displayName }}
      .s-profile-card__copy {{ profile.copy }}
</template>

<script>
export default {
  name: 'ComponentProfileCard',
  props: {
    profile: { type: Object, required: true },
  },
}
</script>
<style lang="scss">
.s-profile-card {
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.6;
  }
  &__copy {
    font-size: 13px;
  }
}
</style>
