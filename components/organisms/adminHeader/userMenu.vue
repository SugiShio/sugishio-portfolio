<template lang="pug">
nav.o-admin-header-user-menu(v-show='isOpen')
  .o-admin-header-user-menu__user-info
    .o-admin-header-user-menu__user-name
      | {{ user.displayName }}
    .o-admin-header-user-menu__user-email
      | {{ user.email }}
  hr.o-admin-header-user-menu__hr
  ul
    li
      button.o-admin-header-user-menu__menu-button(
        type='button',
        @click.stop='goToSetting'
      ) Settings
    li
      button.o-admin-header-user-menu__menu-button(
        type='button',
        @click.stop='signOut'
      ) Signout
</template>

<script>
export default {
  name: 'OrganismsAdminHeaderUserMenu',
  props: {
    isOpen: { type: Boolean, default: false }
  },
  computed: {
    user() {
      return this.$store.state.admin.user || {}
    }
  },
  methods: {
    signOut() {
      this.$fire.auth.signOut()
    },
    goToSetting() {
      this.$router.push({
        name: 'admin-settings'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.o-admin-header-user-menu {
  position: absolute;
  top: 100%;
  right: 10px;
  margin-top: -5px;
  padding-bottom: 5px;
  width: 300px;
  border-radius: 5px;
  box-shadow: 0 0 5px $color-tokinezu;
  border: 1px solid $color-tokinezu;
  background-color: #fff;

  &__hr {
    border-top: 1px solid $color-lightgray;
  }

  &__user-info {
    padding: 10px 20px;
  }

  &__user-email {
    font-size: 12px;
    color: $color-text-weak;
  }

  &__menu-button {
    display: block;
    width: 100%;
    padding: 10px 20px;
    font-size: 14px;
    transition: background-color 0.3s;
    text-align: left;

    &:hover {
      background-color: $color-tokinezu-weak;
    }
  }
}
</style>
