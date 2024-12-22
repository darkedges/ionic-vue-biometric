import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const isVerified = ref(false)
    const inBiometricPrompt = ref(false)

    return { isVerified, inBiometricPrompt }
})