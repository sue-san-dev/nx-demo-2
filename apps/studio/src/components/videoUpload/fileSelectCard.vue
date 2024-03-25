<template>
  <v-card
    width="100%"
    height="100%"
  >
    <v-card-title class="d-flex justify-space-between align-center">
      <div class="text-h6 text-medium-emphasis ps-2">
        動画のアップロード
      </div>
      <div>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="onCloseFn"
        />
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text>
      <div class="d-flex align-center justify-center h-100 ga-3 flex-column">
        <v-btn
          icon="mdi-upload"
          class="bg-blue-grey-lighten-5"
          size="x-large"
          variant="text"
          @click="hiddenInput!.click()"
        />
        <div>
          アップロードする動画ファイルをドラッグ＆ドロップします
          <div class="text-grey-darken-1 text-center text-subtitle-2">
            公開するまで、動画は非公開になります。
          </div>
        </div>
        <v-btn
          color="primary"
          variant="flat"
          @click="hiddenInput!.click()"
        >
          ファイルを選択
        </v-btn>
        <!-- 非表示のinputタグ -->
        <input
          ref="hiddenInput"
          style="display: none"
          type="file"
          accept="video/mp4"
          @change="onChangeFileInput"
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  onCloseFn: () => void,
  onSelectFileFn: (file: File) => void,
}>();

const hiddenInput = ref<HTMLInputElement>();

const onChangeFileInput = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = (target.files as FileList)[0];
  if (!file) return;

  props.onSelectFileFn(file);
}
</script>
