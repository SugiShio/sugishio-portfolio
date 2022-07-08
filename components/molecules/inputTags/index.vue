<template lang="pug">
.m-input-tags
  span.m-input-tags__item(v-for='(item, index) in value')
    atoms-input-tag(
      :value='value[index]',
      @input='emitFilteredValue($event, index)'
    )
  .m-input-tags__add-button(@click='addItem') + Add tag
</template>

<script>
export default {
  name: 'MoleculesInputTags',
  props: { value: { type: Array, default: () => [] } },
  methods: {
    addItem() {
      this.$emit('input', [...this.value, ''])
    },
    emitFilteredValue(value, index) {
      const values = [
        ...this.value.slice(0, index),
        value,
        ...this.value.slice(index + 1),
      ].filter((v) => v)

      this.$emit('input', values)
    },
  },
}
</script>

<style lang="scss">
.m-input-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  &__item {
    & + & {
      margin-left: 10px;
    }
  }

  &__add-button {
    margin-left: 20px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
