<template lang="pug">
section.s-admin-works
  p {{ message.body }}
  molecules-form-item(label='Title')
    atoms-input-text(v-model='work.title')

  molecules-form-item(label='Body')
    atoms-textarea-markdown(v-model='work.body', :rows='5')

  molecules-form-item(label='Tags')
    molecules-input-tags(v-model='work.tags')

  molecules-form-item(label='Is draft')
    atoms-checkbox(v-model='work.isDraft')

  molecules-form-item(label='password')
    atoms-input-text(v-model='work.password')

  molecules-form-item(label='Images')
    input(type='file', multiple, @change='uploadFile')
    ul
      li(v-for='url in fileUrls')
        img(:src='url')
        div {{ url }}

  molecules-form-item
    atoms-button(@button-clicked='post', :text='buttonText')
</template>

<script>
import Work from '~/models/work'

let db = null

export default {
  name: 'PagesAdminWorksId',
  layout: 'admin',
  data() {
    return {
      work: new Work(),
      fileUrls: [],
      message: { body: '', type: null }
    }
  },
  computed: {
    buttonText() {
      return this.isNew ? 'Create' : 'Update'
    },
    id() {
      return this.$route.params.id
    },
    isNew() {
      return this.id === 'new'
    }
  },
  created() {
    db = this.$fire.firestore
    if (!this.isNew) this.fetchWork(this.id)
  },
  methods: {
    createWork() {
      db.collection('works')
        .add(this.work.postFormat)
        .then((docRef) => {
          this.$router.push({
            name: 'admin-works-id',
            params: { id: docRef.id }
          })
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((e) => {
          this.message.body = e
          this.message.type = 'error'
        })
    },
    fetchWork(id) {
      db.collection('works')
        .doc(id)
        .get()
        .then((work) => {
          this.work = new Work({ id: work.id, ...work.data() })
        })
    },
    updateWork() {
      db.collection('works')
        .doc(this.id)
        .set(this.work.postFormat)
        .then(() => {
          this.message.body = 'Document written successfully'
          this.message.type = 'success'
        })
        .catch((e) => {
          this.message.body = e
          this.message.type = 'error'
        })
    },
    uploadFile($event) {
      const files = $event.target.files
      const storageRef = this.$fire.storage.ref()
      files.forEach((file, index) => {
        this.fileUrls.push('')
        const filePath = file.name.replace(
          /(.*?)\./,
          `uploadFiles/$1-${new Date().getTime()}.`
        )
        const imageRef = storageRef.child(filePath)
        imageRef.put(file).then(() => {
          storageRef
            .child(filePath)
            .getDownloadURL()
            .then((url) => {
              this.fileUrls.splice(index, 1, url)
            })
        })
      })
    },
    post() {
      if (this.isNew) {
        this.createWork()
      } else {
        this.updateWork()
      }
    }
  }
}
</script>

<style lang="scss">
.s-admin-work {
  &__title {
    font-size: 24px;
  }

  &__tags {
    margin: 5px 0;
  }

  &__tag {
    display: inline-block;

    & + & {
      margin-left: 10px;
    }
  }

  &__time {
    display: block;
    font-size: 13px;
  }

  &__body {
    margin: 50px 0;
    @extend .markdown;
  }

  &__author {
    margin: 50px 0;
  }

  &__label {
    display: block;
    font-size: 13px;
  }

  &__profile {
    margin: 10px 0;
  }
}
</style>
