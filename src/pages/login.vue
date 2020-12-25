<template lang="pug">
section.login
	h1 Login
	h3(v-show="message") {{ message }}
	form(@submit.prevent="login({ email, password })")
		label 
			input(name="email", v-model="email", type="email", placeholder="Email")
		label 
			input(
				name="password",
				v-model="password",
				type="password",
				minlength="6",
				placeholder="Password"
			)
		.btn-group
			button Login
			router-link(to="/", costom, v-slot="{ navigate }")
				button(role="link", @click="navigate") Cancel
</template>

<script setup>
import { ref, inject } from "vue";
import { router } from "/@/router";
const store = inject("store");
const services = inject("services");

export const email = ref("");
export const password = ref("");
export const message = ref("");

export const login = async (data) => {
	message.value = await services.user.login(data);
};
</script>

<style lang="scss" scoped>
</style>