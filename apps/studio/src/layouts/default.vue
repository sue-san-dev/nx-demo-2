<template>
  <v-app>
    <Header />
    <slot />
  </v-app>
</template>

<script setup lang="ts">
import Header from './header.vue';
</script>
