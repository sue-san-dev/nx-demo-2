<template>
  <v-app-bar :elevation="0">
    <template #prepend>
      <v-app-bar-nav-icon />
    </template>

    <v-app-bar-title>Application Bar</v-app-bar-title>

    <template #append>
      <v-btn icon="mdi-heart" />

      <v-btn icon="mdi-magnify" />

      <v-btn icon="mdi-dots-vertical" />
    </template>
  </v-app-bar>
</template>
