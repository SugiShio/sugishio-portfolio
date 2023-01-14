<template lang="pug">
transition(name='slidein')
  .a-slidein-panel(v-show='isShow')
    button(type='button', @click='$emit("close-clicked")') close
    slot
</template>

<script>
export default {
  name: 'AtomsSlideinPanel',
  props: {
    isShow: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
.a-slidein-panel {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 3px;
  background-color: #fff;
  padding: 30px;
  height: 50vh;
  box-shadow: 0 0 5px rgba(#000, 0.1);
  transform: translateY(0);
  transition: 0.5s;

  &.slidein-enter,
  &.slidein-leave-to {
    transform: translateY(100%);
  }
}
</style>