<template>
  <v-dialog
    v-model="dialog"
    width="800px"
    height="90vh"
  >
    <!-- ファイル選択 -->
    <FileSelectCard 
      v-if="selectedFile == null"
      :on-close-fn="onCloseDialog"
      :on-select-file-fn="onSelectFile"
    />
    <!-- ファイル情報入力 -->
    <FileInfoInputCard
      v-if="selectedFile"
      :file="selectedFile"
      :on-close-fn="onCloseDialog"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import FileSelectCard from './fileSelectCard.vue';
import FileInfoInputCard from './fileInfoInputCard.vue';

const emit = defineEmits(['close']);

const dialog = ref(true);
const selectedFile = ref<File | null>(null);

watchEffect(() => {
  if (!dialog.value) emit('close');
});

const onCloseDialog = () => {
  emit('close');
}

const onSelectFile = (file: File) => {
  selectedFile.value = file
}
</script>
