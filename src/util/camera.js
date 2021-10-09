const Camera = {
  async torch(enable) {
    const camera = 'auto';
    const narrowDownFacingMode = async () => {
      // Modern phones often have multipe front/rear cameras.
      // Sometimes special purpose cameras like the wide-angle camera are picked
      // by default. Those are not optimal for scanning QR codes but standard
      // media constraints don't allow us to specify which camera we want exactly.
      // However, explicitly picking the first entry in the list of all videoinput
      // devices for as the default front camera and the last entry as the default
      // rear camera seems to be a workaround.
      const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
        ({ kind }) => kind === 'videoinput',
      );

      if (devices.length > 2) {
        const frontCamera = devices[0];
        const rearCamera = devices[devices.length - 1];

        switch (camera) {
          case 'auto':
            return { deviceId: { exact: rearCamera.deviceId } };
          case 'rear':
            return { deviceId: { exact: rearCamera.deviceId } };
          case 'front':
            return { deviceId: { exact: frontCamera.deviceId } };
          default:
            return undefined;
        }
      } else {
        switch (camera) {
          case 'auto':
            return { facingMode: { ideal: 'environment' } };
          case 'rear':
            return { facingMode: { exact: 'environment' } };
          case 'front':
            return { facingMode: { exact: 'user' } };
          default:
            return undefined;
        }
      }
    };
    const constraints = {
      audio: false,
      video: {
        width: { min: 360, ideal: 640, max: 1920 },
        height: { min: 240, ideal: 480, max: 1080 },
        ...(await narrowDownFacingMode(camera)),
      },
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const [track] = stream.getVideoTracks();
    const capabilities = track.getCapabilities();

    if (capabilities.torch) {
      await track.applyConstraints({
        advanced: [{ torch: enable }],
      });
    } else {
      console.warn('device does not support torch capability');
    }
  },
};

export default Camera;
