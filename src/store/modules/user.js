import { router } from "/@/router"

// state
export const state = {
	id: null,
	role: null,
	name: null,
	email: null,
	haskey: null,
	haskey_id: null,
}

// action
export const actions = {
	saveUser({ state, commit }, user) {
		commit("clearUser")
		commit("setUser", user)
	},
	removeUser({ state, commit }) {
		commit("clearUser")
	},
}

// mutation
export const mutations = {
	setUser(state, data) {
		state.id = data.id
		state.role = data.role
		state.name = data.name
		state.email = data.email
		state.haskey = data.haskey
		state.haskey_id = data.haskey_id
	},
	clearUser(state, data) {
		state.id = null
		state.role = null
		state.name = null
		state.email = null
		state.haskey = null
		state.haskey_id = null
	},
}

// getter
export const getters = {
	getUser: (state) => state,
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
}
