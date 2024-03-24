<template>
  <v-card
    width="100%"
    height="100%"
  >
    <v-card-title class="d-flex justify-space-between align-center">
      <div class="text-h6 text-medium-emphasis ps-2">
        {{ videoTitle }}
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

    <v-stepper 
      v-model="step"
      :items="stepperItems"
      hide-actions
      editable
      flat
      alt-labels
    >
      <template #item.1>
        <VideoDetailStepItem 
          :file-name="file.name"
          :file-convert-progress="fileConvertProgress"
          :file-upload-progress="fileUploadProgress"
          :video-url="videoUrl"
          v-model:video-title="videoTitle"
          v-model:description="description"
        />
      </template>
      <template #item.2>
        <VideoElementsStepItem />
      </template>
      <template #item.3>
        <VideoCheckStepItem />
      </template>
      <template #item.4>
        <VideoPrivacySettingStepItem />
      </template>

      <template #default="{ prev, next }">
        <v-divider />
        <v-stepper-actions
          color="primary"
          :disabled="stepperActionsDisabled"
          :prev-text="step === 1 ? '' : '戻る'"
          @click:prev="prev()"
          :next-text="step === stepperItems.length ? '保存' : '次へ'"
          @click:next="step === stepperItems.length ? onClickSave() : next()"
        />
      </template>
    </v-stepper>
  </v-card>

  <v-snackbar
    v-model="snackbar"
    :timeout="2000"
    color="success"
    elevation="2"
  >
    登録に成功しました
  </v-snackbar>
</template>

<script setup lang="ts">
import { readonly, ref } from 'vue';
import { useFetch } from 'nuxt/app';
import VideoDetailStepItem from './fileInfoInputStepItems/videoDetailStepItem.vue';
import VideoElementsStepItem from './fileInfoInputStepItems/videoElementsStepItem.vue';
import VideoCheckStepItem from './fileInfoInputStepItems/videoCheckStepItem.vue';
import VideoPrivacySettingStepItem from './fileInfoInputStepItems/videoPrivacySettingStepItem.vue';
import { computed } from 'vue';
// なぜかimportできない...
// import { ReqUrlUtil } from '@nx-demo/shared-utils';

const props = defineProps<{
  file: File,
  onCloseFn: () => void,
}>();

const step = ref(1);
const snackbar = ref(false);
const videoTitle = ref(props.file.name);
const videoUuid = ref('');
const videoUrl = computed(() => !videoUuid.value ? '' : 'http://localhost:4200/watch?v=' + videoUuid.value);
const description = ref('');
const fileConvertProgress = ref(0);
const fileUploadProgress = ref(0);
const isFormInvalid = computed(() => !videoUuid.value);
const stepperActionsDisabled = computed<boolean | 'prev' | 'next'>(() => {
  if (isFormInvalid.value) return true;
  if (step.value === 1) return 'prev';
  return false;
});
const stepperItems = readonly([
  '詳細',
  '動画の要素',
  'チェック',
  '公開設定',
] as const);

const onClickSave = async () => {
  if (!videoUuid.value) return;

  const { data } = await useFetch('http://localhost:3000/api/v1/video', {
    method: 'patch',
    query: {
      v: videoUuid.value
    },
    body: {
      title: videoTitle,
      description,
    }
  });
  snackbar.value = true;
}

const init = async () => {
  const formData = new FormData();
  formData.append('file', props.file);
  // nuxt組み込みのuseFetchがSSEに対応していないのでnode標準のfetchを使用
  const response = await fetch(/** ReqUrlUtil.file.upload */'http://localhost:3000/api/v1/video', {
    method: 'post',
    body: formData,
  });
  const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value: streamValue, done } = await reader.read();
    if (done) break;

    const [type, value] = streamValue.split(':');
    switch (type) {
      case 'converting':
        fileConvertProgress.value = Math.floor(+value);
        break;
      case 'uploading':
        fileUploadProgress.value = Math.floor(+value);
        break;
      case 'completed':
        videoUuid.value = value;
        break;
    }
  }
}

init();
</script>

<style lang="scss" scoped>
:deep(.v-stepper) {
  height: 100%;
  display: flex;
  flex-direction: column;

  .v-stepper-actions {
    padding: 0.5rem;
    justify-content: flex-end;
    gap: 6px;
  }
  .v-stepper-window {
    flex: 1;
    margin-top: 0;
    overflow-y: auto;
  }
  .v-stepper-header {
    margin: 0.5rem 1.5rem;
    box-shadow: none;
  }
  .v-stepper-item {
    border-radius: 6px;
    padding: 0.7rem;
  }
  .v-stepper-item__avatar.v-avatar {
    margin-bottom: 8px;
  }
}
</style>