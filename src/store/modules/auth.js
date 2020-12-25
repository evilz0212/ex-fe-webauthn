import { router } from "/@/router"

// state
export const state = {
	token: "",
	isLogin: false,
}

// action
export const actions = {
	saveAuth({ state, commit }, data) {
		commit("setAuth", {
			token: data.token,
			isLogin: data.isLogin,
		})
	},
	saveToken({ state, commit }, data) {
		commit("setToken", {
			token: data.token,
		})
	},
	saveIsLogin({ state, commit }, data) {
		commit("setIsLogin", {
			isLogin: data.isLogin,
		})
	},
	removeAuth({ state, commit }) {
		commit("clearAuth")
	},
}

// mutation
export const mutations = {
	setAuth(state, { token, isLogin }) {
		state.token = token
		state.isLogin = isLogin
	},
	setToken(state, { token }) {
		state.token = token
	},
	setIsLogin(state, { isLogin }) {
		state.isLogin = isLogin
	},
	clearAuth(state) {
		state.token = ""
		state.isLogin = false
	},
}

// getter
export const getters = {}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
}
