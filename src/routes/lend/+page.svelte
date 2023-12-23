<script lang="ts">
	import Category from '$lib/components/Category.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class=" max-w-6xl mx-auto">
	<div class=" px-4 bg-[url('/lender-splash.svg')] bg-no-repeat bg-right-top bg-auto h-screen">
		<h1 class="text-4xl md:text-7xl text-[#030d54] font-semibold mt-20">
			<span> Start earning on </span>
			<br />
			<span> Fat Llama</span>
		</h1>
		<p class=" text-lg md:text-xl mt-8 mb-12 text-muted-foreground font-light">
			Make money lending your belongings to <br /> people in your area
		</p>

		<div class="flex items-center gap-2 mt-6">
			<Button size="lg" class="rounded-full text-lg ">list an item</Button>
		</div>
	</div>
	<Category />
</div>
