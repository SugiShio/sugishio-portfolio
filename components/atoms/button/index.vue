<template lang="pug">
button.a-button(:class='type', :disabled='disabled', @click='onClick') {{ text }}
</template>

<script>
export default {
  name: 'AtomsButton',
  props: {
    text: { type: String, default: '' },
    type: { type: String, default: 'primary' },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    onClick() {
      this.$emit('button-clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
.a-button {
  padding: 5px 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }

  &.primary {
    background-color: $color-theme;
    border-color: $color-theme;
    color: #fff;
  }
}
</style>
