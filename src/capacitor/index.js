import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import store from '@/store';

App.addListener('appStateChange', (state) => {
  store.commit('pause', !state.isActive);
});

App.addListener('backButton', (event) => {
  console.log('backButton:', event);

  if (!event.canGoBack) {
    App.exitApp();
  } else {
    window.history.back();
  }
});

(async () => {
  console.log('language:', await Device.getLanguageCode());
})();
