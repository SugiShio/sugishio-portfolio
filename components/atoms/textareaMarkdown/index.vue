<template lang="pug">
.a-textarea-markdown
  .a-textarea-markdown__container
    textarea.a-textarea-markdown__textarea(
      :value='value',
      @input='$emit("input", $event.target.value)'
    )
  .a-textarea-markdown__container
    .a-textarea-markdown__preview(v-html='markedValue')
</template>

<script>
import { Text } from '~/utils/text'

export default {
  name: 'AtomsInputText',
  props: {
    value: { type: String, default: '' },
    rows: { type: Number, default: 5 }
  },
  computed: {
    markedValue() {
      return Text.markText(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.a-textarea-markdown {
  display: flex;
  height: 500px;
  max-height: 50vh;

  &__container {
    width: 100%;
    overflow: scroll;

    & + & {
      margin-left: 20px;
    }
  }

  &__textarea {
    @extend %input;
    display: block;
    width: 100%;
    height: 100%;
  }

  &__preview {
    padding: 5px 10px;
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
