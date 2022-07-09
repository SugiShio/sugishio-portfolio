<template lang="pug">
section.s-profile-card
  .s-profile-card__link
    nuxt-link(:to='{ name: "profile" }')
      .s-profile-card__name {{ profile.displayName }}
      .s-profile-card__copy {{ profile.copy }}
  ul.s-profile-card__accounts
    li.s-profile-card__account(v-for='account in profile.accounts')
      a(:href='account.url', target='_blank')
        img(:src='account.imagePath')
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
  &__link {
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.6;
    }
  }

  &__copy {
    font-size: 13px;
  }

  &__accounts {
    margin: 20px 0;
  }

  &__account {
    display: inline-block;
    width: 24px;
    filter: saturate(0);
    opacity: 0.7;
    transition: filter 0.3s, opacity 0.3s;

    &:hover {
      opacity: 1;
      filter: saturate(100%);
    }

    & + & {
      margin-left: 10px;
    }
  }
}
</style>
