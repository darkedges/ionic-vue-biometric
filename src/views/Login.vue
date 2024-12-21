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
import router from '@/router';
import { logInOutline } from 'ionicons/icons';
import { IonButton, IonRow, IonCol, IonLabel, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { useUserStore } from '@/stores/user.store'
import { useRoute } from 'vue-router'
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { onMounted, ref } from 'vue'
const store = useUserStore()
const route = useRoute()

function cli() {
    store.isVerified = true
    let r = route.query.returnTo
    router.push({ path: r, replace: true })
}

onMounted(() => {
    try {
        FingerprintAIO.show({
            reason: "For easy log in",
            title: "Flybuys",
            subtitle: "Biometric sign in for Flybuys",
            description: "To continue, please provide your biometric credentials.",
            useFallback: true
        })
            .then(() => {
                store.isVerified = true
                let r = route.query.returnTo
                router.push({ path: r, replace: true })
            })
            .catch(() => { alert(false) });
    } catch (e) {
        alert("l3")
    }
})
</script>