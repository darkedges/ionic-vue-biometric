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

const store = useUserStore()

App.addListener('pause', () => {
  console.log('pause')
  store.isVerified = false
})

App.addListener('resume', () => {
  console.log('resume')
  router.go()
})
</script>
