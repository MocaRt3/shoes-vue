<template>
	<div>
		<header class="flex justify-between border-b border-slate-200 px-8 py-8">
			<router-link to="/">
				<div class="flex items-center gap-4">
					<img src="/logo.png" alt="Logo" class="w-10">
					<div>
						<h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
						<p class="text-slate-400"> Лучший магазин кроссовок</p>
					</div>
				</div>
			</router-link>
			<nav>
				<ul class="flex items-center gap-10">
					<li @click="openDrawer" class="flex items-center gap-3 text-slate-500 hover:text-black cursor-pointer">
						<img src="/cart.svg" alt="Cart">
						{{ totalPrice }} руб.
					</li>
					<router-link to="/favorites">
						<li class="flex items-center gap-3 text-slate-500 hover:text-black cursor-pointer">
							<img src="/heart.svg" alt="Heart">
							Закладки
						</li>
					</router-link>
					<li class="flex items-center gap-3 text-slate-500 hover:text-black cursor-pointer">
						<img src="/profile.svg" alt="Profile">
						Профиль
					</li>
				</ul>
			</nav>
		</header>
	</div>
</template>

<script setup>
const props = defineProps({
	openDrawer: Function,
	totalPrice: Number,
})
</script>

<style lang="scss" scoped></style>