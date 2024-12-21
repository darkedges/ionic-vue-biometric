import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { createPinia } from 'pinia'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
const pinia = createPinia()

import { useUserStore } from '@/stores/user.store'
import {
  has
} from 'lodash';

const app = createApp(App)
  .use(IonicVue)
  .use(pinia)
  .use(router);

const userStore = useUserStore();

router.beforeEach(async (to, from, next) => {
  if (has(to, 'meta.authenticate') && to.meta.authenticate === true) {
    if (!userStore.isVerified) {
      next({
        name: 'Login',
        query: {
          returnTo: to.path
        }
      });
    } else {
      next()
    }
  } else {
    next()
  }
})

router.isReady().then(() => {
  app.mount('#app');
});
