<template lang="pug">
section.register
	h1 Register
	h3(v-show="message") {{ message }}
	form(@submit.prevent="register({ email, name, password, c_password })")
		label 
			input(name="email", v-model="email", type="email", placeholder="Email")
		label 
			input(name="name", v-model="name", placeholder="User name")
		label 
			input(
				name="password",
				v-model="password",
				type="password",
				minlength="6",
				placeholder="Password"
			)
		label 
			input(
				name="c_password",
				v-model="c_password",
				type="password",
				minlength="6",
				placeholder="Confirmation"
			)
		.btn-group
			button Register
			router-link(to="/", costom, v-slot="{ navigate }")
				button(role="link", @click="navigate") Cancel
</template>

<script setup>
import { ref, inject } from "vue";
const store = inject("store");
const services = inject("services");

export const email = ref("");
export const name = ref("");
export const password = ref("");
export const c_password = ref("");
export const message = ref("");

export const register = async (data) => {
	message.value = await services.user.register(data);
};
</script>

<style lang="scss" scoped>
</style>