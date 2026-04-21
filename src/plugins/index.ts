import type { App } from 'vue';
import { createPinia } from 'pinia';
import i18n from '../i18n/language/i18n-config';
import router from '../router';
import vuetify from './vuetify';

export function registerPlugins(app: App) {
  app.use(vuetify);
  app.use(createPinia());
  app.use(i18n);
  app.use(router);
}
