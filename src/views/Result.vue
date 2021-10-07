<template>
  <v-container>
    <v-card
      height="100%"
      flat>
      <v-card-title>
        <v-btn
          @click="$router.back()"
          icon>
          <v-icon>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <span>
          결과
        </span>
      </v-card-title>
      <v-card-text>
        {{ decodeValue }}
      </v-card-text>
    </v-card>
    <v-footer
      absolute>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" @click="onSearch">검색</v-btn>
      <v-btn class="mr-2" @click="onMove">이동</v-btn>
      <v-btn class="mr-2" @click="onCopy">복사</v-btn>
      <v-btn class="mr-2" @click="onShare">공유</v-btn>
      <v-spacer></v-spacer>
    </v-footer>
    <v-snackbar
      top
      v-model="showCopyNotify"
      :timeout="3000">
      복사되었습니다.
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Result',
  computed: {
    ...mapGetters({
      decodeValue: 'decodeValue',
    }),
  },
  data: () => ({
    showCopyNotify: false,
  }),
  watch: {
    decodeValue: {
      immediate: true,
      handler(value) {
        if (value === '') {
          this.$router.push('/');
        }
      },
    },
  },
  methods: {
    onSearch() {
      const query = `https://www.google.com/search?q=${encodeURI(this.decodeValue)}`;
      window.open(query, '_blank');
    },
    onMove() {
      window.open(encodeURI(this.decodeValue), '_blank');
    },
    onCopy() {
      const tempTag = document.createElement('textarea');
      document.body.appendChild(tempTag);
      tempTag.value = this.decodeValue;
      tempTag.select();
      document.execCommand('copy');
      document.body.removeChild(tempTag);
      this.showCopyNotify = true;
    },
    onShare() {
    },
  },
};
</script>

<style scoped>

</style>
