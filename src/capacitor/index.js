import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';

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
