<template lang="pug">
  div {{ displayName }}
</template>

<script>
export default {
  data() {
    return {
      displayName: '',
    }
  },
  created() {
    const db = this.$fire.firestore
    db.collection('users')
      .doc('cNGaEz47YNVbOYkSNlxrvqUoOpp2')
      .get()
      .then((doc) => {
        const data = doc.data()
        this.displayName = data.displayName
      })
  },
}
</script>
