import "./styles/index.scss"

import { createApp } from "vue"
import { useStore } from "/@/store"
import { router } from "/@/router"
import App from "./App.vue"
import components from "/@/components"

const Vue = createApp(App)
Vue.use(useStore)

Object.keys(components).forEach((key) => {
	Vue.component(key, components[key])
})

Vue.use(router)
Vue.mount("#app")
