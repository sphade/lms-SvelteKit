<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
</script>

<div class="flex justify-end relative h-[440px] mt-5 px-4">
	<div
		class="bg-white sm:absolute h-fit top-3 w-full left-3 rounded-3xl p-8 shadow-xl border max-w-[480px]"
	>
		<h1 class="text-xl md:text-[35px] text-[#030d54] leading-tight font-semibold mb-6">
			DJ Equipment Hire Near me
		</h1>
		<p class="text-muted-foreground md:text-lg mb-10 md:mb-20">
			With DJ equipment, you can create the ultimate party atmosphere and pump out the music that
			gets the party going. Don't forget about lights and smoke machines to enhance the ambiance as
			well.
		</p>
		<SearchBar />
	</div>
	<img
		src="/cameras.png"
		class=" hidden md:inline-block object-cover max-w-[800px] w-full rounded-3xl"
		alt=""
	/>
</div>

<div class="grid grid-cols-3 gap-3 md:gap-5 md:mt-32 px-4">
	<ProductCard />
	<ProductCard />
	<ProductCard />
	<ProductCard />
	<ProductCard />
	<ProductCard />
	<ProductCard />
	<ProductCard />
	<ProductCard />
	<ProductCard />
	<ProductCard />
	<ProductCard />
</div>
