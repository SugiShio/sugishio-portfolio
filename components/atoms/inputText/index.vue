<template lang="pug">
input.a-input-text(:value='value', @input='$emit("input", $event.target.value)')
</template>

<script>
export default {
  name: 'AtomsInputText',
  props: {
    value: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.a-input-text {
  @extend %input;
}
</style>
