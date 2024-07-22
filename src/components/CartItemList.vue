<template>
	<div>
		<div class="flex flex-col flex-1 gap-4" v-auto-animate>
			<CartItem
				:key="item.id"
				v-for="item in cart"
				:item="item" 
				@on-click-remove="() => removeFromCart(item)"
			/>
		</div>
	</div>
</template>

<script setup>
import CartItem from './CartItem.vue';
import { inject } from "vue";

const { cart, removeFromCart } = inject('cart');
</script>

<style lang="scss" scoped></style>