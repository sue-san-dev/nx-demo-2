<template>
  <div>
    <v-app>
      <!-- header -->
      <v-app-bar 
        :elevation="0"
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-app-bar-title>Studio</v-app-bar-title>
        <template #append>
          <v-btn icon="mdi-heart" />
          <v-btn icon="mdi-magnify" />
          <v-btn icon="mdi-dots-vertical" />
        </template>
      </v-app-bar>
  
      <!-- sidenav -->
      <v-navigation-drawer
        v-model="drawer"
      >
        <v-list>
          <v-list-item
            class="py-4"
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="チャンネル"
          />
          <template 
            v-for="(menuItem, index) in menuItems"
            :key="index"
          >
            <v-list-item 
              :title="menuItem.title" 
              :to="menuItem.path"
            >
              <template #prepend>
                <v-icon 
                  color="primary" 
                  :icon="menuItem.icon"
                />
              </template>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
  
      <!-- main contents -->
      <v-main>
        <v-container fluid>
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
import { ref, readonly } from 'vue';

const drawer = ref(null);
const menuItems = readonly([
  { title: 'ダッシュボード', path: '/', icon: 'mdi-view-dashboard' },
  { title: 'コンテンツ', path: '/videos/upload', icon: 'mdi-play-box-multiple-outline' },
  { title: 'アナリティクス', path: '/analytics', icon: 'mdi-google-analytics' },
  { title: 'コメント', path: '/comments/inbox', icon: 'mdi-comment-text' },
]);
</script>
