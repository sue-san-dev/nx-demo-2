<template>
  <div>
    <div class="text-h6 font-weight-bold">
      チャンネルのダッシュボード
    </div>
    <v-card
      width="400"
    >
      <v-card-text class="d-flex flex-column align-center py-10">
        <img src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3_darkmode.svg">
        <div class="d-flex flex-column align-center text-grey-darken-1">
          <span>最近の動画の指標を表示しますか？</span>
          <span>動画をアップロードして公開してください。</span>
        </div>
        <v-btn
          class="mt-4 mb-10"
          color="primary"
          variant="flat"
          @click="dialog = true"
        >
          動画をアップロード
        </v-btn>
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
                  @click="dialog = false"
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
                  @click="$refs.hiddenInput.click()"
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
                  @click="$refs.hiddenInput.click()"
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
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// なぜかimportできない...
// import { ReqUrlUtil } from '@nx-demo/shared-utils';

const dialog = ref(false);
const progress = ref(0);

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