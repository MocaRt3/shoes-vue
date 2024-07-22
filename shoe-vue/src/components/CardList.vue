<template>
	<div>
		<div class="grid  grid-cols-4 gap-5" v-auto-animate>
			<Card
			  v-for="item in items"
			  :key="item.id"
			  :id="item.id"
			  :img-url="item.imageUrl"
			  :title="item.title"
			  :price="item.price"
			  :on-click-add="() => emit('addToCart', item)" 
			  :on-click-favorite="() => emit('addToFavorite', item)"
			  :is-favorite="item.isFavorite"
			  :is-added="item.isAdded"
			  :favorite-icon="true"
			/>
		</div>
	</div>
</template>

<script setup>
import { inject } from "vue";
import Card from './Card.vue';

defineProps({
	items: Array,
	
});

const emit = defineEmits(['addToFavorite', 'addToCart']);





</script>

<style lang="scss" scoped></style>