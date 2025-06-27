import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'


const app = createApp(App)
app.use(vuetify).use(router)
app.mount('#app')
