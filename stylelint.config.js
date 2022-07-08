module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  ignoreFiles: ['assets/fonts/**/*'],
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['include', 'mixin', 'extend'] },
    ],
  },
}
