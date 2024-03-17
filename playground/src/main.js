// import './assets/main.css'

import { createApp } from 'vue'
import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
import App from './App.vue'
import { firebaseApp } from './firebase'

const app = createApp(App)
app.use(VueFire, {
    firebaseApp,
    modules: [VueFireFirestoreOptionsAPI()],
})

createApp(App).mount('#app')
