<template>
	<div class="info flex flex-col items-center text-center w-72 mx-auto">
		<img :src="imageUrl" alt="Info Image" class="info__img">
		<h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
		<p class="text-gray-400 mt-2">{{ description }}</p>
	</div>
</template>

<script setup>
const props = defineProps({
	title: String,
	description: String,
	imageUrl: String,
});
</script>

<style lang="scss" scoped>
	.info{
		&__img{
			height: 90px;
			width: 90px;
		}
	}
</style>