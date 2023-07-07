import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './assets/style/reset.min.css'

import 'nprogress/nprogress.css'

const app = createApp(App)

app.use(router).use(store)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) app.component(key, component)

app.mount('#app')
