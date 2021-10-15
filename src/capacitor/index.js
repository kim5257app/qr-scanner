import { registerPlugin } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { Camera } from '@capacitor/camera';
import store from '@/store';

App.addListener('appStateChange', async (state) => {
  await Camera.requestPermissions({ permissions: ['camera'] });
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

const eventPlugin = registerPlugin('Event');

eventPlugin.addListener('focusChanged', async (hasFocus) => {
  if (hasFocus) {
    await Camera.requestPermissions({ permissions: ['camera'] });
  }
});

export default eventPlugin;
