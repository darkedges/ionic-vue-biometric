<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Login</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-row class="ion-justify-content-center">
                <ion-col size="sm">
                    <ion-button @click="cli">
                        <ion-icon aria-hidden="true" :icon="logInOutline" />
                        <ion-label>Login</ion-label>
                    </ion-button>
                </ion-col></ion-row>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { logInOutline } from 'ionicons/icons';
import { IonButton, IonRow, IonCol, IonLabel, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.store'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore();

function cli() {
    // userStore.isVerified = true
    // const r = route.query.returnTo
    // router.push({ path: r, replace: true })
}

onMounted(() => {
    userStore.inBiometricPrompt = true
    FingerprintAIO.show({
        title: "Flybuys",
        subtitle: "Biometric sign in for Flybuys",
        description: "To continue, please provide your biometric credentials."
    })
        .then(() => {
            alert('SUCCESS')
            userStore.isVerified = true
            userStore.inBiometricPrompt = false
            const r = route.query.returnTo
            router.push({ path: r, replace: true })
        })
        .catch(() => {
            alert('CANCEL')
            userStore.isVerified = false
            userStore.inBiometricPrompt = false
            const r = route.query.returnTo
            router.push({ path: r, replace: true })
        });
})
</script>