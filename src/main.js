import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import authStore from './store/auth'
import axios from 'axios'

axios.defaults.withCredentials = true

// Swal
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Bootstrap
import '@/assets/css/bootstrap.css'
import '@/assets/vendors/bootstrap-icons/bootstrap-icons.css'
import '@/assets/css/app.css'

authStore.dispatch('user')
    .then(() => {
        const app = createApp(App)
        app.use(VueSweetalert2);
        app.use(store);
        app.use(router);
        app.mount('#app')
    })