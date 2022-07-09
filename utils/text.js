import DOMPurify from 'dompurify'
import { marked } from 'marked'

export class Text {
  constructor(string) {
    this.string = string
  }

  static markText(string) {
    string = marked(string)
    return this.sanitize(string)
  }

  static sanitize(string) {
    return DOMPurify.sanitize(string)
  }
}
