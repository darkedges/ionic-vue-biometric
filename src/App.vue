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
  alert("store.inBiometricPrompt: " + store.inBiometricPrompt)
  if (!store.inBiometricPrompt) {
    alert("Not in Biometric Prompt")
    store.isVerified = false
  }
})

App.addListener('resume', () => {
  alert("store.inBiometricPrompt: " + store.inBiometricPrompt + "\n" + "store.isVerified: " + store.isVerified)
  router.go(0)
})

</script>
