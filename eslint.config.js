import typescriptEslint from '@typescript-eslint/eslint-plugin';
import vuetify from 'eslint-config-vuetify';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default vuetify(
  {
    ts: true,
  },
  {
    ignores: ['src/i18n/language/message-keys.g.ts'],
  },
  eslintPluginPrettierRecommended,
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    rules: {
      ...(process.env.CI === 'true' && {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
      }),
    },
  },
);
