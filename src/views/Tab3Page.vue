<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-icon :color="userStore.isVerified ? 'success' : 'danger'" slot="start"
            :icon="icon[userStore.isVerified ? 'checkmarkCircleOutline' : 'closeCircleOutline']"></ion-icon>
          <ion-label>isVerified</ion-label>
          <ion-note slot="end">{{ userStore.isVerified }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-icon :color="userStore.inBiometricPrompt ? 'success' : 'danger'" slot="start"
            :icon="icon[userStore.inBiometricPrompt ? 'checkmarkCircleOutline' : 'closeCircleOutline']"></ion-icon>
          <ion-label>inBiometricPrompt</ion-label>
          <ion-note slot="end">{{ userStore.inBiometricPrompt }}</ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonNote } from '@ionic/vue';
import * as icon from 'ionicons/icons';
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()
</script>
