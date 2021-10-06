<template>
  <div>
    <div
      class="cam-container">
      <qrcode-stream
        @decode="onDecode">
      </qrcode-stream>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  name: 'Home',
  components: {
    QrcodeStream,
  },
  methods: {
    ...mapMutations({
      decodeValue: 'decodeValue',
    }),
    onDecode(value) {
      this.decodeValue(value);
      this.$router.push('/result');
    },
  },
};
</script>

<style lang="scss" scoped>
.cam-container {
  margin: auto;
  width: 100%;
  height: 100vh;
}
</style>
