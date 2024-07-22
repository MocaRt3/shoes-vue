<template>
	<div>
		<div style="height: 100%;" class=" relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
			<img v-if="favoriteIcon" @click="onClickFavorite" :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" alt="like" class="absolute top-8 left-8">
			<img style="height: 224px;" :src="imgUrl" alt="shoes" class="">
			<p class="mt-2">{{title}}</p>
			<div class="flex justify-between mt-5">
				<div class="flex flex-col">
					<span class="text-slate-400">Цена:</span>
					<span>{{price}} руб. </span>
				</div>

				<img v-if="favoriteIcon" @click="onClickAdd" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="plus" class="">
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	imgUrl: String,
	title: String,
	id: Number,
	price: Number,
	isFavorite: Boolean,
	isAdded: Boolean,
	onClickFavorite: Function,
	onClickAdd: Function,
	favoriteIcon: Boolean,
});



</script>

<style lang="scss" scoped></style>