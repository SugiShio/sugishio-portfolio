<template lang="pug">
dl.m-form-item
  dt.m-form-item__label {{ label }}
  dd.m-form-item__content
    slot
</template>

<script>
export default {
  name: 'MoleculesFormItem',
  props: {
    label: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.m-form-item {
  margin: 40px auto;

  @include screen-pc {
    display: flex;
  }

  &__label {
    @include screen-pc {
      flex-shrink: 0;
      padding-top: 6px;
      margin-right: 20px;
      width: 150px;
      text-align: right;
    }
  }

  &__content {
    flex-grow: 1;
  }
}
</style>
