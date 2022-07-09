module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  ignoreFiles: ['assets/fonts/**/*'],
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['include', 'mixin', 'extend'] },
    ],
  },
}
