<script lang="ts">
	import type { Category } from '$lib/types';
	import type { Icon } from 'lucide-svelte';
	import { Trash } from 'lucide-svelte';
	import { queryParam } from 'sveltekit-search-params';
	import { cn } from '$lib/utils';

	export let items: Category[];
	const currentCategory = queryParam('categoryId');
</script>

<div class="flex items-center gap-x-2 overflow-x-auto pb-2">
	{#each items as { id, name }}
		<button
			on:click={() => {
				if ($currentCategory === id) {
					return ($currentCategory = '');
				}
				$currentCategory = id;
			}}
			class={cn(
				'py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition',
				{
					'border-sky-700 bg-sky-200/20 text-sky-800': $currentCategory === id
				}
			)}
		>
			<div class="truncate">{name}</div>
		</button>
	{/each}
</div>
