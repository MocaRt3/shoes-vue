<template>
	<div>
		<div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
			<img :src="item.imageUrl" alt="shoes" class="w-16 h-16">
			<div class="flex flex-col flex-1">
				<p>{{ item.title }}</p>

				<div class="flex  justify-between mt-2">
					<b class="flex flex-1">{{ item.price }}</b>
					<img @click="emit('onClickRemove')" class="opacity-50 cursor-pointer hover:opacity-100 transition" src="/close.svg" alt="x">
				</div>	
			</div>
		</div>
	</div>
</template>

<script setup>
const emit = defineEmits(['onClickRemove']);
const props = defineProps({
	item: Object

});
</script>

<style lang="scss" scoped></style>