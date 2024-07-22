<template>
	<div>
		<div @click="clickOutsideWhite" class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
		<div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
			<div class="flex items-center justify-between cursor-pointer mb-8">
				<img @click="props.closeDrawer" src="/arrow-right.svg" alt="" class="rotate-180 w-5 transition hover:scale-125">
				<h2 class="text-3xl font-bold">Корзина</h2>
			</div>


			<div v-if="!totalPrice || orderId" class="flex h-full items-center">	
				<infoBlock v-if="orderId" title="Заказ оформлен!" :description="`Ваш заказ ${orderId} скоро будет передан курьерской доставке`" imageUrl="/order-success-icon.png" />		
				<infoBlock v-if="!totalPrice && !orderId" title="Корзина пустая" description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ" imageUrl="/package-icon.png" />
			</div>

			<CartItemList />

			<div v-if="totalPrice" class="flex flex-col gap-5 my-6">

				<div class="flex gap-2 items-stretch">
					<span>Итого</span>
					<div class=" flex-1 border-b border-dashed border-slate-300"></div>
					<b>{{ totalPrice }} р</b>
				</div>

				<div class="flex gap-2 items-stretch">
					<span>Налог 5%</span>
					<div class=" flex-1 border-b border-dashed border-slate-300"></div>
					<b>{{ vat }} р</b>
				</div>

				<button :disabled="cartButtonDisabled ? true : false" @click="createOrder"
					class="mt-8  bg-lime-500 w-full rounded-xl py-3 disabled:bg-slate-400 cursor-pouinter text-white hover:bg-lime-600 active:bg-lime-700 transition ">
					Оформить заказ
				</button>

			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, watch, provide, ref, inject } from "vue";
import CartItemList from './CartItemList.vue';
import infoBlock from './infoBlock.vue'
import axios from "axios";

const { cart, closeDrawer } = inject('cart')


const props = defineProps({
	closeDrawer: Function,
	totalPrice: Number,
	vat: Number,

});

const isCreatingOrder = ref(false);
const orderId = ref(null);

const clickOutsideWhite = () => {
	props.closeDrawer()
};

const createOrder = async () => {
	try {
		isCreatingOrder.value = true;
		const { data } = await axios.post('https://5ae88c88eef836e8.mokky.dev/orders', {
			items: cart.value,
			totalPrice: props.totalPrice
		});

		cart.value = [];

		orderId.value = data.id;
	} catch (err) {
		console.log(err)
	} finally {
		isCreatingOrder.value = false
	}
};

const cartIsEmpty = computed(() => cart.value.length === 0);
const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value);
</script>

<style lang="scss" scoped></style>