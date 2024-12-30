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
                    <ion-button @click="loginWithBiometrics">
                        <ion-icon aria-hidden="true" :icon="logInOutline" />
                        <ion-label>Login with Biometrics</ion-label>
                    </ion-button>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    isVerified: {{ userStore.isVerified }}</br>
                    inBiometricPrompt: {{ userStore.inBiometricPrompt }}
                </ion-col>
            </ion-row>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { logInOutline } from 'ionicons/icons';
import { IonButton, IonRow, IonCol, IonLabel, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { NativeBiometric } from '@darkedges/capacitor-secure-storage';
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.store'
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