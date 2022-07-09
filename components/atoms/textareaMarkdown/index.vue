<template lang="pug">
.a-textarea-markdown
  button(type='button', @click='isEdit = !isEdit') {{ toggleIsEditButtonText }}
  .a-textarea-markdown__container
    textarea.a-textarea-markdown__textarea(
      v-if='isEdit',
      :value='value',
      @input='$emit("input", $event.target.value)'
    )
    .a-textarea-markdown__preview(v-else, v-html='markedValue')
</template>

<script>
import { Text } from '~/utils/text'

export default {
  name: 'AtomsInputText',
  props: {
    value: { type: String, default: '' },
    rows: { type: Number, default: 5 },
  },
  data() {
    return {
      isEdit: true,
    }
  },
  computed: {
    markedValue() {
      return Text.markText(this.value)
    },
    toggleIsEditButtonText() {
      return this.isEdit ? 'Preview' : 'Edit'
    },
  },
}
</script>

<style lang="scss" scoped>
.a-textarea-markdown {
  &__container {
    height: 500px;
    overflow: scroll;
  }

  &__textarea {
    @extend %input;
    height: 100%;
  }

  &__preview {
    padding: 5px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
  }
}
</style>

<style lang="scss">
.a-textarea-markdown {
  &__preview {
    @extend .markdown;
  }
}
</style>
