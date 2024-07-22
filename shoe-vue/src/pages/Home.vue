<template>
	<div>
		<div class="flex justify-between items-center">
			<h2 class="text-3xl font-bold mb-8">Вcе Кроссовки</h2>
			<div class="flex gap-4">
				<select @change="onChangeSelect" name="" id=""
					class="py-2 px-3 border border-slate-300 rounded-md hover:border-slate-400">
					<option value="name" class="">По названию</option>
					<option value="price" class="">По цене(дешевые)</option>
					<option value="-price" class="">По цене(дорогие)</option>
				</select>
				<div class="relative">
					<img src="/search.svg" alt="search-icon" class="absolute top-3 left-4">
					<input @input="onChangeSearchInput" placeholder="Поиск..." type="text"
						class="border border-slate-300 rounded-md py-2 pl-11 pr-4 focus:border-gray-400 hover:border-slate-400 transition ">
				</div>
			</div>
		</div>
		<CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
	</div>
</template>

<script setup>
import CardList from "../components/CardList.vue";
import { inject, reactive, watch, ref, onMounted } from 'vue';
import axios from 'axios';
import debounce from 'lodash.debounce';

const { cart, addToCart, removeFromCart } = inject('cart');

const items = ref([]);

const filters = reactive({
	sortBy: 'title',
	searchQuery: '',
});

const onChangeSelect = event => filters.sortBy = event.target.value;

const onChangeSearchInput = debounce(event => filters.searchQuery = event.target.value, 500);

const onClickAddPlus = item => {
	if (!item.isAdded) {
		addToCart(item);
	} else {
		removeFromCart(item);
	}
};

const fetchItems = async () => {
	try {
		const params = {
			sortBy: filters.sortBy,

		};

		if (filters.searchQuery) {
			params.title = `*${filters.searchQuery}*`
		}

		const { data } = await axios.get('https://5ae88c88eef836e8.mokky.dev/shoes', {
			params
		});
		items.value = data.map(obj => ({
			...obj,
			isFavorite: false,
			favoriteId: null,
			isAdded: false,
		}));
	} catch (err) {
		console.log(err)
	}
};

const fetchFavorites = async () => {
	try {
		const { data: favorites } = await axios.get('https://5ae88c88eef836e8.mokky.dev/favorites');
		items.value = items.value.map(item => {
			const favorite = favorites.find(favorite => favorite.parentId === item.id);

			if (!favorite) {
				return item;
			}
			return {
				...item,
				isFavorite: true,
				favoriteId: favorite.id,
			};
		});

		
	} catch (err) {
		console.log(err)
	}
};

const addToFavorite = async (item) => {
	try {
		if (!item.isFavorite) {
			const obj = {
				parentId: item.id,
				item
			};
			item.isFavorite = true;
			const { data } = await axios.post('https://5ae88c88eef836e8.mokky.dev/favorites', obj);

			item.favoriteId = data.id;
		} else {
			item.isFavorite = false;

			await axios.delete(`https://5ae88c88eef836e8.mokky.dev/favorites/${item.favoriteId}`);
			item.favoriteId = null;
		}

	} catch (err) {
		console.log(err)
	}

};

onMounted(async () => {
	const localCart = localStorage.getItem('cart');
	cart.value = localCart ? JSON.parse(localCart) : [];



	await fetchItems();
	await fetchFavorites();


	items.value = items.value.map(i => ({
		...i,
		isAdded: cart.value.some(cartItem => cartItem.id === i.id),

	}));
});

watch(cart, () => {
	items.value = items.value.map(i => ({
		...i,
		isAdded: false,

	}));
});

watch(filters, async () => fetchItems());
</script>

<style lang="scss" scoped></style>