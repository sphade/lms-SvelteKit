<script lang="ts">
	import { queryParam, ssp } from 'sveltekit-search-params';

	import { Search } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	const currentTitle = queryParam('title', ssp.string(), {
		debounceHistory: 1500
	});
</script>

<div class="relative">
	<Search class="h-4 w-4 absolute top-3 left-3 text-slate-600" />
	<Input
		bind:value={$currentTitle}
		placeholder="Search for a course"
		class="w-full md:w-[300px] pl-9 rounded-full bg-slate-100"
	/>
</div>
