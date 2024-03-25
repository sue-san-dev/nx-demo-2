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
          @click="showDialog = true"
        >
          動画をアップロード
        </v-btn>
        <VideoUploadDialog 
          v-if="showDialog" 
          @close="showDialog = false"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VideoUploadDialog from '../../../components/videoUpload/videoUploadDialog.vue';

const showDialog = ref(false);
</script>