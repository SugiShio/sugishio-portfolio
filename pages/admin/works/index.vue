<template lang="pug">
section.s-admin-works
  ul
    li.s-admin-works__item(v-for='work in works')
      nuxt-link.s-admin-works__link(:to='goToDetail(work.id)')
        .s-admin-works__work-title
          | {{ work.title }}
          span.s-admin-works__lock(v-if='work.isPasswordRequired')
            i.icon-lock
        time.s-admin-works__work-row {{ createdAtText(work) }}
</template>

<script>
import Work from '~/models/work'

let db = null

export default {
  name: 'PagesAdminworks',
  layout: 'admin',
  data() {
    return {
      works: []
    }
  },
  created() {
    db = this.$fire.firestore
    this.fetchworks()
  },
  methods: {
    createdAtText(work) {
      return work.createdAt.formattedDate('YYYY/MM/DD HH:mm')
    },
    goToDetail(id) {
      return { name: 'admin-works-id', params: { id } }
    },
    fetchworks() {
      db.collection('works')
        // .orderBy('createdAt')
        .get()
        .then((works) => {
          works.forEach((work) => {
            this.works.push(new Work({ id: work.id, ...work.data() }))
          })
        })
    }
  }
}
</script>

<style lang="scss">
.s-admin-works {
  &__link {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: $color-tokinezu;
    }
  }

  &__work-title,
  &__work-row {
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__work-title {
    flex-grow: 1;
  }

  &__work-row {
    flex-shrink: 0;
    min-width: 20%;
  }

  &__lock {
    vertical-align: middle;
    margin-left: 5px;
  }
}
</style>
