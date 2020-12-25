<template lang="pug">
section.home
	h1 Webauthn API
	.login(v-if="!isLogin")
		router-link(to="/login", costom, v-slot="{ navigate }")
			button(role="link", @click="navigate") Login
		router-link(to="/register", costom, v-slot="{ navigate }")
			button(role="link", @click="navigate") Register

	.member(v-if="isLogin")
		router-link(to="/member", costom, v-slot="{ navigate }")
			button(role="link", @click="navigate") Profile
</template>

<script setup>
export const name = "member";
import { computed, ref, inject } from "vue";
const store = inject("store");
const services = inject("services");

export const isLogin = store.state.auth.isLogin;
</script>

<style lang="scss" scoped>
.login,
.member {
	@include flex(c, c, col);

	a,
	button {
		width: 200px;
		margin-bottom: 20px;
	}
	:last-child {
		margin-bottom: 0;
	}
}
</style>