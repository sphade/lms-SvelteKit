<script lang="ts">
	import Category from '$lib/Category.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<div class=" max-w-6xl mx-auto">
	<div class=" px-4 bg-[url('/bg-image.svg')] bg-no-repeat bg-right-top bg-auto h-screen">
		<h1 class="text-4xl md:text-7xl text-[#030d54] font-semibold mt-20">
			<span> Rent </span>
			<span class="text-[#295cd3]"> anything </span><br />
			<span> from people in</span> <br />
			<span> your area </span>
		</h1>
		<p class=" text-lg md:text-2xl mt-8 mb-12 text-[#767676] font-light">
			Borrow almost anything from people nearby <br /> for jobs at home, fun experiences or work.
		</p>
		<SearchBar />
		<div class="flex items-center gap-2 mt-6">
			<p>or</p>
			<Button variant="ghost" href="/lend" size="lg" class="rounded-full text-lg "
				>list an item</Button
			>
		</div>
	</div>
	<Category />
</div>
