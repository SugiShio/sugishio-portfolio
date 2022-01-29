<template lang="pug">
.s-l-default
  header.s-l-default__header
  main.s-l-default__main
    nuxt
</template>

<script>
export default {
  name: 'LayoutsDefault',
  computed: {
    deviceType() {
      return this.$store.state.deviceType
    }
  },
  methods: {
    backPage() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.s-l-default {
  &__main {
    padding: 40px;

    @include screen-pc {
      padding: 80px;
    }
  }
}
</style>
