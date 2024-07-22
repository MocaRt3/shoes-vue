<template>
	<Drawer v-if="drawerOpen" :close-drawer="closeDrawer" :total-price="totalPrice" :vat="vatPrice" />
	<div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-20 mb-20">
		<Header :total-price="totalPrice" :open-drawer="openDrawer" />

		<div class="p-10">
			<router-view></router-view>
		</div>

	</div>
</template>

<script setup>

import { ref, watch, provide, computed } from "vue";
import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';

// КОРЗИНА START

const cart = ref([]);
const drawerOpen = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, i) => acc + i.price, 0));
const vatPrice = computed(() => totalPrice.value * 0.05);




const addToCart = item => {
	cart.value.push(item);
	item.isAdded = true;
};

const removeFromCart = item => {
	cart.value.splice(cart.value.indexOf(item), 1);
	item.isAdded = false;
};


const closeDrawer = () => {
	drawerOpen.value = false;
};
const openDrawer = () => {
	drawerOpen.value = true;
};

watch(cart, () => {
	localStorage.setItem('cart', JSON.stringify(cart.value));
}, {
	deep: true,
});

provide('cart', {
	cart,
	addToCart,
	removeFromCart,
});

// КОРЗИНА END


</script>

<style scoped></style>
