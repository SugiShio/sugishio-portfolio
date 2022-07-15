<template lang="pug">
header.o-admin-header
  button.o-admin-header__user-icon(
    v-if='isSignin',
    type='button',
    @click.stop='openUserMenu'
  ) {{ userInitialLetter }}
  organisms-admin-header-user-menu(:is-open='this.isUserMenuOpen')
</template>

<script>
export default {
  name: 'OrganismsAdminHeader',
  data() {
    return {
      isUserMenuOpen: false
    }
  },
  computed: {
    isSignin() {
      return this.$store.getters['admin/isSignin']
    },
    userInitialLetter() {
      const user = this.$store.state.admin.user
      const userName = user.displayName || user.email
      return userName[0]
    }
  },
  mounted() {
    window.addEventListener('click', () => {
      this.closeUserMenu()
    })
  },
  methods: {
    signOut() {
      this.$fire.auth.signOut()
    },
    openUserMenu() {
      this.isUserMenuOpen = true
    },
    closeUserMenu() {
      this.isUserMenuOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.o-admin-header {
  position: relative;
  display: flex;
  justify-content: end;
  padding: 10px 20px;
  background-color: $color-tokinezu;

  &__user-icon {
    transition: opacity 0.3s;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    color: darken($color-tokinezu, 30%);
    background-color: rgba(#fff, 0.8);

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
