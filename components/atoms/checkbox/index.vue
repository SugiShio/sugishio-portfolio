<template lang="pug">
label.a-checkbox
  input.a-checkbox__input(
    type='checkbox',
    :checked='value',
    @change='$emit("input", $event.target.checked)'
  )
  span.a-checkbox__check
  span.a-checkbox__label(v-if='label')
    | {{ label }}
</template>

<script>
export default {
  name: 'AtomsCheckbox',
  props: {
    label: { type: String, default: '' },
    value: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss">
.a-checkbox {
  cursor: pointer;

  &__input {
    display: none;
  }

  &__check {
    position: relative;
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 3px;
    border: 1px solid #888;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      width: 6px;
      height: 3px;
      border-bottom: 1px solid #fff;
      border-left: 1px solid #fff;
      transform: rotate(-45deg);
    }

    .a-checkbox__input:checked + & {
      border-color: $color-theme;
      background-color: $color-theme;
    }
  }

  &__label {
    margin-left: 10px;
  }
}
</style>
