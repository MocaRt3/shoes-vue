<template>
	<div>
		<h1>Мои закладки</h1>
		<div class="grid grid-cols-4 gap-5" v-auto-animate>
			<Card 
				v-for="favor in favorites"
				:key="favor.item.id"
				:id="favor.item.id"
				:img-url="favor.item.imageUrl"
			    :title="favor.item.title"
				:price="favor.item.price"
				:favorite-icon="false"
			/>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Card from "../components/Card.vue";

const favorites = ref([]);

onMounted(async () => {
	try {
		const { data } = await axios.get('https://5ae88c88eef836e8.mokky.dev/favorites');
		favorites.value = data;
		console.log(favorites.value)
	} catch (err) {
		console.log(err);
	}
});
</script>

<style lang="scss" scoped></style>