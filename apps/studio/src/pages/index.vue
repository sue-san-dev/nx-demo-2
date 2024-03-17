<script setup lang="ts">
import { definePageMeta } from 'nuxt/dist/pages/runtime';

definePageMeta({
  middleware: ['redirect-to-channel-page'],
});
</script>
