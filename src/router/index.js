import { createRouter, createWebHistory } from "vue-router"
import { useStore } from "/@/store"

import home from "/@/pages/home.vue"
import login from "/@/pages/login.vue"
import register from "/@/pages/register.vue"
import member from "/@/pages/member.vue"

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: home,
		},
		{
			path: "/member",
			component: member,
			meta: {
				onLogin: true,
			},
		},
		{
			path: "/login",
			name: "login",
			component: login,
		},
		{
			path: "/register",
			name: "register",
			component: register,
		},
		{
			// 錯誤路徑
			path: "/:pathMatch(.*)*",
			name: "not-found",
			redirect: "/",
		},
	],
})

router.beforeEach((to, from, next) => {
	const store = useStore()
	const auth = store.state.auth
	// 登入判斷
	if (to.meta.onLogin) {
		if (auth && auth.isLogin) {
			// 權限判斷
			if (to.meta.roles && to.meta.roles.indexOf(auth.role) === -1) {
				// alert('403)
			} else {
				next()
			}
		} else {
			next({ path: "/" })
		}
	} else {
		next()
	}
})
