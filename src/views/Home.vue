<template>
  <div>
    <div
      class="cam-container">
      <qrcode-stream
        @decode="onDecode">
      </qrcode-stream>
    </div>
    <div
      class="control-container">
      <div
        class="d-flex">
        <v-spacer></v-spacer>
        <v-btn
          @click="torch = !torch"
          color="accent"
          icon>
          <v-icon>
            {{ (torch) ? 'mdi-flash' : 'mdi-flash-off' }}
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { QrcodeStream } from 'vue-qrcode-reader';
import util from '@/util';

export default {
  name: 'Home',
  components: {
    QrcodeStream,
  },
  data: () => ({
    torch: false,
  }),
  watch: {
    torch(value) {
      util.Camera.torch(value);
    },
  },
  methods: {
    ...mapMutations({
      decodeValue: 'decodeValue',
    }),
    onDecode(value) {
      this.decodeValue(value);
      this.$router.push('result');
    },
  },
};
</script>

<style lang="scss" scoped>
.cam-container {
  margin: auto;
  max-width: 800px;
  width: 100%;
  height: 100vh;
}

.control-container {
  top: 1rem;
  width: 100%;
  position: fixed;
}
</style>
