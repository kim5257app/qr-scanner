import { App } from '@capacitor/app';

App.addListener('backButton', (event) => {
  console.log('backButton:', event);

  if (!event.canGoBack) {
    App.exitApp();
  } else {
    window.history.back();
  }
});
