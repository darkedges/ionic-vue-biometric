<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { App } from '@capacitor/app';
import { useUserStore } from '@/stores/user.store'
import router from '@/router';
import { useRoute } from 'vue-router';
const userStore = useUserStore()
const route = useRoute()

App.addListener('pause', () => {
  if (!userStore.inBiometricPrompt) {
    userStore.isVerified = false;
  }
})
App.addListener('resume', () => {
  if (route.path !== '/login') {
    router.push({ name: 'Login', query: { "returnTo": route.fullPath } })
  }
})
</script>
