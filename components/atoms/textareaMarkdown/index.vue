<template lang="pug">
.a-textarea-markdown
  textarea.a-textarea-markdown__textarea(
    v-if='isEdit',
    :value='value',
    :rows='5',
    @input='$emit("input", $event.target.value)'
  )
  .a-textarea-markdown__preview(v-else, v-html='markedValue')
  button(type='button', @click='isEdit = !isEdit') {{ toggleIsEditButtonText }}
</template>

<script>
import DOMPurify from 'dompurify'
import { marked } from 'marked'

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
      return marked(DOMPurify.sanitize(this.value.replace(/(\\n|<br>)/g, '\n')))
    },
    toggleIsEditButtonText() {
      return this.isEdit ? 'Preview' : 'Edit'
    },
  },
}
</script>

<style lang="scss" scoped>
.a-textarea-markdown {
  &__textarea {
    @extend %input;
  }
}
</style>
