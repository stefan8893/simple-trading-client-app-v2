import typescriptEslint from '@typescript-eslint/eslint-plugin';
import vuetify from 'eslint-config-vuetify';

export default vuetify({
  ts: true,
}, {
  plugins: {
    '@typescript-eslint': typescriptEslint,
  },
  rules: {
    '@stylistic/semi': ['warn', 'always'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}, {
  rules: {
    ...(process.env.CI === 'true' && {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    }),
  },
});
