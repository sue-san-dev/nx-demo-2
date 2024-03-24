<template>
  <div class="text-h6 font-weight-bold mb-3">
    詳細
  </div>

  <div class="d-flex ga-4">
    <!-- left side -->
    <div class="d-flex flex-column ga-4 w-100">
      <v-textarea
        v-model="videoTitle"
        label="タイトル (必須)"
        placeholder="動画について説明するタイトルを追加 (@ を使用して、チャンネルをメンションできます)"
        persistent-placeholder
        counter="100"
        row-height="20"
        rows="2"
        variant="outlined"
        auto-grow
      />
      <v-textarea
        v-model="description"
        label="説明"
        placeholder="視聴者に向けて動画の内容を紹介 (@ を使用して、チャンネルをメンションできます)"
        persistent-placeholder
        counter="5000"
        row-height="20"
        rows="5"
        variant="outlined"
        auto-grow
      />
      <div>
        <div>
          サムネイル
        </div>
        <div class="text-caption text-grey-darken-1">
          動画の内容がわかる画像を選択するかアップロードします。視聴者の目を引くサムネイルにしましょう。
        </div>
        <div class="text-red">
          未実装
        </div>
      </div>
      <div>
        <div>
          再生リスト
        </div>
        <div class="text-caption text-grey-darken-1">
          再生リストに動画を追加して、視聴者のためにコンテンツを整理しましょう。
        </div>
        <div class="text-red">
          未実装
        </div>
      </div>
      <div>
        <div>
          視聴者
        </div>
        <div class="text-caption">
          この動画は子ども向けでない動画として設定されています
        </div>
        <div class="text-caption text-grey-darken-1">
          自分の所在地にかかわらず、児童オンライン プライバシー保護法（COPPA）やその他の法令を遵守することが法的に必要です。自分の動画が子ども向けに制作されたものかどうかを申告する必要があります。
        </div>
        <div class="text-red">
          未実装
        </div>
      </div>
    </div>

    <!-- right side -->
    <div class="right-side">
      <div class="d-flex flex-column">
        <v-responsive :aspect-ratio="16 / 9" class="border rounded-t pa-3">
          <div class="d-flex justify-center">
            動画プレビュー未実装
          </div>
          <v-progress-circular
            :model-value="fileConvertProgress"
            :rotate="360"
            :size="100"
            :width="15"
            color="teal"
          >
            {{ fileConvertProgress }}%
          </v-progress-circular>
        </v-responsive>
        <div class="bg-grey-lighten-3 rounded-b pa-3 ga-2 d-flex flex-column">
          <div>
            <div class="text-caption text-grey-darken-2">
              動画リンク
            </div>
            <div class="text-body-2">
              <div v-if="!videoUrl">生成中...</div>
              <a v-if="videoUrl" :href="videoUrl" target="_blank" class="word-break">
                {{ videoUrl }}
              </a>
            </div>
          </div>
          <div>
            <div class="text-caption text-grey-darken-2">
              ファイル名
            </div>
            <div class="text-body-2 word-break">
              {{ fileName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  fileName: string,
  fileConvertProgress: number,
  fileUploadProgress: number,
  videoUrl: string,
}>();
const videoTitle = defineModel('videoTitle');
const description = defineModel('description');
</script>

<style lang="scss">
.right-side {
  width: 280px;
  min-width: 280px;

  .v-responsive {
    background-color: #B2DFDB;

    .v-progress-circular {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .word-break {
    word-break: break-all;
  }
  a {
    color: revert;
  }
}
</style>
