<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import admob from '@/capacitor/admob';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  async mounted() {
    await admob.initialize();
    await admob.showBanner();
  },
};
</script>
