import vuetify from 'eslint-config-vuetify'

export default vuetify(
  {
    ts: true,
  },
  {
    rules: {
      '@stylistic/space-before-function-paren': 'off',
    },
  },
  // strict rules in ci pipeline
  {
    rules: {
      ...(process.env.CI === 'true' && {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
      }),
    },
  },
)
