<template lang="pug">
.a-image-uploader
  ul.a-image-uploader__images
    li.a-image-uploader__image-item(v-for='file in files')
      button.a-image-uploader__image(
        type='button',
        :style='{ backgroundImage: `url("${file.uploadedUrl}")` }',
        @click='copyImageTag(file)'
      )
    li.a-image-uploader__add
      input(type='file', @input='uploadFile')
</template>

<script>
export default {
  name: 'AtomsImageUploader',
  data() {
    return {
      files: []
    }
  },
  methods: {
    copyImageTag(file) {
      const tagValue = `![${file.originalName}](${file.uploadedUrl})`
      navigator.clipboard.writeText(tagValue).then(() => {
        console.log('success')
      })
    },

    uploadFile($event) {
      const files = $event.target.files || []
      const storageRef = this.$fire.storage.ref()
      Array.from(files).forEach((file, index) => {
        this.files.push('')
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
              this.files.splice(index, 1, {
                originalName: file.name,
                uploadedUrl: url
              })
            })
            .catch((e) => {
              console.log(e)
            })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.a-image-uploader {
  &__images {
    display: flex;
  }

  &__add,
  &__image-item {
    width: 100px;
    height: 100px;
  }

  &__image {
    width: 100%;
    height: 100%;
    background-color: $color-lightgray;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
}
</style>