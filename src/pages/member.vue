<template lang='pug'>
section.member
	h2 Hi, {{ user.name }}
	h3(v-show="message") {{ message }}

	.keySection(v-if="!hasSecurityKey")
		img(src="/@/assets/Fingerprints.svg")
		p You can register a new security key
		button(@click="webauthnRegister") Register

	.keySection(v-if="hasSecurityKey")
		img(src="/@/assets/Fingerprints.svg")
		p My security key - 01
		button(@click="webauthnDestroy(SecurityKeyID)") Destroy

	.btn-group
		button(@click="logout") Logout
</template>

<script setup>
export const name = "member";
import { computed, ref, inject } from "vue";
const store = inject("store");
const services = inject("services");

// 更新使用者資料
services.user.loadUser();

export const user = computed(() => store.state.user);
export const message = ref("");

export const logout = services.user.logout;
export const hasSecurityKey = computed(() => user.value.haskey);
export const SecurityKeyID = computed(() => user.value.haskey_id);

export const webauthnRegister = async (data) => {
	message.value = await services.user.webauthnRegister(data);
	services.user.loadUser();
};
export const webauthnDestroy = async (key) => {
	message.value = await services.user.webauthnDestroy(key);
	services.user.loadUser();
};
</script>

<style lang='scss' scoped>
</style>