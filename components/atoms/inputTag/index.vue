<template lang="pug">
component.a-input-tag(:is='isEdit ? "div" : "span"')
  input.a-input-tag__input(
    v-if='isEdit',
    :value='value',
    ref='input',
    @blur='finishEditing'
  )
  span.a-input-tag__tag(v-else, @click='focusOnInput')
    | {{ value }}
</template>

<script>
export default {
  name: 'AtomsInputTag',
  props: { value: { type: String, default: '' } },
  data() {
    return {
      isEdit: false,
    }
  },
  created() {
    if (this.value === '') {
      this.focusOnInput()
    }
  },
  methods: {
    focusOnInput() {
      this.isEdit = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    finishEditing($event) {
      this.$emit('input', $event.target.value)
      this.isEdit = false
    },
  },
}
</script>

<style lang="scss" scoped>
.a-input-tag {
  width: 150px;

  &__input {
    @extend %input;
  }

  &__tag {
    display: inline-block;
    width: 100%;
    padding: 5px 10px;
    background-color: $color-lightgray;
    border-radius: 5px;
  }
}
</style>
