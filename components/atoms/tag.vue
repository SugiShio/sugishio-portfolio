<template lang="pug">
.s-tag(@click='$emit("click")') {{ text }}
</template>

<script>
export default {
  name: 'AtomsTag',
  props: {
    text: { type: String, required: true },
  },
}
</script>

<style lang="scss" scoped>
.s-tag {
  position: relative;
  color: $color-text-weak;
  font-size: 13px;
  line-height: 1.3;
  transition: opacity 0.3s;
  cursor: pointer;
  &::before {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    background-color: $color-text-weak;
    left: 0;
    bottom: 0;
    transform: scale(0, 1);
    transition: transform 0.3s;
    transform-origin: left;
  }
  &:hover {
    opacity: 0.6;
    &::before {
      transform: scale(1, 1);
    }
  }
}
</style>
