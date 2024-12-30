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
        <ion-footer>
            <ion-button expand="block" @click="loginWithBiometrics">
                <ion-icon slot="start" :ios="icon['fingerPrint']" :md="icon['fingerPrint']"></ion-icon>
                Sign in with Biometrics</ion-button>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { IonFooter, IonList, IonButton, IonItem, IonNote, IonLabel, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { NativeBiometric } from '@darkedges/capacitor-secure-storage';
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.store'
import * as icon from 'ionicons/icons';
const router = useRouter()
const route = useRoute()
const userStore = useUserStore();

function loginWithBiometrics() {
    userStore.inBiometricPrompt = true
    NativeBiometric.verifyIdentity({
        title: "Flybuys",
        subtitle: "Biometric sign in for Flybuys",
        description: "To continue, please provide your biometric credentials.",
        useFallback: true
    })
        .then(() => {
            userStore.isVerified = true
            userStore.inBiometricPrompt = false
            const r = route.query.returnTo
            router.push({ path: r, replace: true })
        })
        .catch(() => {
            userStore.isVerified = false
            userStore.inBiometricPrompt = false
        });
}

onMounted(() => {
    loginWithBiometrics()
})
</script>