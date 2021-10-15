<template>
  <div>
    <div
      class="cam-container">
      <qrcode-stream
        v-if="!pause"
        @decode="onDecode">
        <div
          class="guide-wrapper">
          <div
            class="guide-container">
            <div class="guide-line guide-line-1"></div>
            <div class="guide-line guide-line-2"></div>
            <div class="guide-line guide-line-3"></div>
            <div class="guide-line guide-line-4"></div>
          </div>
        </div>
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
import { mapGetters, mapMutations } from 'vuex';
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
  computed: {
    ...mapGetters({
      pause: 'pause',
    }),
  },
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
  background-color: #000000;
}

.control-container {
  top: 1rem;
  width: 100%;
  position: fixed;
}

.guide-wrapper {
  position: absolute;
  width: 50%;
  padding-bottom: 56.26%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .guide-container {
    position: absolute;
    width: 100%;
    height: 100%;

    .guide-line {
      position: absolute;
      width: 25%;
      height: 25%;

      &-1 {
        top: 0;
        left: 0;
        border-top: red solid 4px;
        border-left: red solid 4px;
      }

      &-2 {
        top: 0;
        right: 0;
        border-top: red solid 4px;
        border-right: red solid 4px;
      }

      &-3 {
        bottom: 0;
        left: 0;
        border-bottom: red solid 4px;
        border-left: red solid 4px;
      }

      &-4 {
        bottom: 0;
        right: 0;
        border-bottom: red solid 4px;
        border-right: red solid 4px;
      }
    }
  }
}
</style>
