<template lang="pug">
section.card
	router-link(to="/")
		img.logo(alt="Webauthn", src="/@/assets/Fingerprints.svg")
	router-view
</template>

<script setup>
import { provide } from "vue";
import { useStore } from "/@/store";
import { services } from "/@/services";
export const name = "App";

provide("store", useStore());
provide("services", services);
</script>

<style lang="scss">
.logo {
	@include linear-bg(card);
	@include linear-border();
	@include bd-rs(circle);
	padding: 18px;
	margin-bottom: 30px;
}
</style>