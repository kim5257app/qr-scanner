import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { Device } from '@capacitor/device';

import en from '@/locales/en.json';
import ko from '@/locales/ko.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  messages: {
    en,
    ko,
  },
  locale: 'en',
  fallbackLocale: 'en',
});

Device.getLanguageCode().then((result) => {
  i18n.locale = result.value.slice(0, 2);
});

export default i18n;
