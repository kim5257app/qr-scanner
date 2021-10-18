import {
  AdMob,
  BannerAdPluginEvents,
  BannerAdSize,
  BannerAdPosition,
} from '@capacitor-community/admob';

export default {
  async initialize() {
    await AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: [
        'f83022bc-27ad-471d-84a0-a480ec5a8ac3',
      ],
      initializeForTesting: false,
    });
  },
  async showBanner() {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      // Subscribe Banner Event Listener
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size) => {
      // Subscribe Change Banner Size
      console.log('AdMob Size changed:', size);
    });

    const options = {
      adId: 'ca-app-pub-5194192385820634/4257522863',
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: false,
      // npa: true
    };
    await AdMob.showBanner(options);
  },
  async hideBanner() {
    await AdMob.hideBanner();
  },
  async resumeBanner() {
    await AdMob.resumeBanner();
  },
};
