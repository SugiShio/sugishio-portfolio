import DOMPurify from 'dompurify'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/tokyo-night-dark.css'

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  },
})

export class Text {
  constructor(string) {
    this.string = string
  }

  static markText(string) {
    string = marked.parse(string)
    return this.sanitize(string)
  }

  static sanitize(string) {
    return DOMPurify.sanitize(string)
  }
}
