<script lang="ts">
	import CategoryCard from './components/CategoryCard.svelte';
	let categories = [
		{
			title: 'film $ photography',
			image: 'cameras.png'
		},
		{
			title: 'DJ Equipment',
			image: 'dj.jpg'
		},
		{
			title: 'Drones',
			image: 'drones.png'
		},
		{
			title: 'Electronics',
			image: 'electronics.png'
		},
		{
			title: 'Lenses',
			image: 'lenses.png'
		},
		{
			title: 'Musical Instruments',
			image: 'musicalin.jpg'
		},
		{
			title: 'Projectors',
			image: 'projectors.png'
		},
		{
			title: 'Electric scooters',
			image: 'scooter.png'
		},
		{
			title: 'Vehicles',
			image: 'transport.jpg'
		},
		{
			title: 'Sewing Machines',
			image: 'sewing.jpg'
		}
	];
</script>

<div class="px-4">
	<h2 class="text-3xl text-[#111111] font-medium mb-10">Explore our categories</h2>
	<div class="grid grid-cols-2 sm:grid-cols-5 gap-7 md:gap-[46px]">
		{#each categories as { image, title }}
			<CategoryCard {image} {title} />
		{/each}
	</div>
</div>
