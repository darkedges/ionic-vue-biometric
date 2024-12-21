<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item>
        <ion-label>
          isVerified: {{ store.isVerified }}
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useUserStore } from '@/stores/user.store'

const store = useUserStore()
</script>
