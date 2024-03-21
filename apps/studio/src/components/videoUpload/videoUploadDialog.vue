<template>
  <v-dialog
    v-model="dialog"
    width="800px"
    height="90vh"
  >
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
            @click="emit('close')"
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
          <!-- 進捗度 -->
          <div>
            <v-progress-circular
              :model-value="progress"
              :rotate="360"
              :size="100"
              :width="15"
              color="teal"
            >
              {{ progress }}
            </v-progress-circular>
          </div>
          <!-- 非表示のinputタグ -->
          <input
            ref="hiddenInput"
            style="display: none"
            type="file"
            accept="video/mp4"
            @change="onSelectFile"
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
// なぜかimportできない...
// import { ReqUrlUtil } from '@nx-demo/shared-utils';

const emit = defineEmits(['close']);

const dialog = ref(true);
const progress = ref(0);
const hiddenInput = ref<HTMLInputElement>();

watchEffect(() => {
  if (!dialog.value) emit('close');
});

const onSelectFile = async event => {
  const target = event.target as HTMLInputElement;
  const file = (target.files as FileList)[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  // nuxt組み込みのuserFetch APIがSSEに対応していないのでnode標準のfetchを使用
  const response = await fetch(/** ReqUrlUtil.file.upload */'http://localhost:3000/api/v1/file/upload', {
    method: 'post',
    body: formData,
  });
  const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    progress.value = Math.floor(+value);
  }
}
</script>
