<template lang="pug">
.a-textarea-markdown
  template(v-if='isEdit')
    textarea.a-textarea-markdown__textarea(
      :value='value',
      @input='$emit("input", $event.target.value)'
    )
  .a-textarea-markdown__preview(v-else, v-html='markedValue')
  .a-textarea-markdown__tools
    template(v-if='isEdit')
      button(type='button', @click='showImageUploader = true') Upload image
    button(type='button', @click='isEdit = !isEdit') {{ toggleIsEditButtonText }}
  atoms-slidein-panel(
    :is-show='showImageUploader',
    @close-clicked='showImageUploader = false'
  )
    atoms-image-uploader
</template>

<script>
import { Text } from '~/utils/text'

export default {
  name: 'AtomsInputTextareaMarkdown',
  props: {
    value: { type: String, default: '' },
    rows: { type: Number, default: 5 }
  },
  data() {
    return {
      isEdit: true,
      showImageUploader: false
    }
  },
  computed: {
    markedValue() {
      return Text.markText(this.value)
    },
    toggleIsEditButtonText() {
      return this.isEdit ? 'Preview' : 'Edit'
    }
  },
}
</script>

<style lang="scss" scoped>
.a-textarea-markdown {
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 50vh;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: scroll;

  &__textarea,
  &__preview,
  &__tools {
    padding: 5px 10px;
  }

  &__textarea {
    width: 100%;
    height: 100%;
    border: 0;
  }

  &__preview {
    overflow: scroll;
  }

  &__tools {
    border-top: 1px dashed #eee;
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
