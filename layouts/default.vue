<template lang="pug">
.s-l-default
  main.s-l-default__main
    nuxt
  footer.s-l-default__footer
    .s-l-default__footer-title
      nuxt-link(:to='{ name: "index" }') SugiShio Portforio
    span.s-l-default__copyright © SugiShio
</template>

<script>
export default {
  name: 'LayoutsDefault',
  computed: {
    deviceType() {
      return this.$store.state.deviceType
    },
  },
  methods: {
    backPage() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss">
.s-l-default {
  &__main {
    margin: 0 auto;
    padding: 40px;
    max-width: 162vh;

    @include screen-pc {
      padding: 80px;
    }
  }

  &__footer {
    padding: 20px 40px;

    @include screen-pc {
      display: flex;
      justify-content: space-between;
      padding: 20px 80px;
    }
  }

  &__footer-title {
    transition: opacity 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }

  &__copyright {
    margin-top: 10px;
    font-size: 13px;
  }
}
</style>
