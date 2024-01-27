<script lang="ts">
	import { page } from '$app/stores';
	import type { Chapter } from '$lib/types';
	import { cn, draggable } from '$lib/utils';
	import { Grip, Pencil } from 'lucide-svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { Badge } from '$lib/components/ui/badge';
	export let items: Chapter[];

	const flipDurationMs = 150;
	function handleConsider(e: CustomEvent<DndEvent<Chapter>>) {
		items = e.detail.items;
		console.log('🚀 ~ handleConsider ~ items:', items);
	}
	function handleFinalize(e: CustomEvent<DndEvent<Chapter>>) {
		const { items: newItems } = e.detail;
	}

	console.log($page);
</script>

<ul
	use:dndzone={{ items: items, flipDurationMs }}
	on:consider={handleConsider}
	on:finalize={handleConsider}
>
	{#each items as item (item.id)}
		<li
			animate:flip={{ duration: flipDurationMs }}
			class={cn(
				'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm',
				{
					// isPublished
					'bg-sky-100 border-sky-200 text-sky-700': true
				}
			)}
		>
			<div
				class={cn(
					'px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
					{
						// isPublished

						'border-r-sky-200 hover:bg-sky-200': true
					}
				)}
			>
				<Grip class="h-5 w-5" />
			</div>
			<p class="truncate">
				{item.title}
			</p>
			<div class="ml-auto pr-2 flex items-center gap-x-2">
				<!-- isFree  in a badge-->
				{#if item.isFree}
					<Badge>free</Badge>
				{/if}
				<!-- isPublished , div should be a badge -->
				<!-- isPublished -->
				<Badge
					class={cn('bg-slate-500', {
						'bg-sky-700': item.isPublished
					})}
				>
					{#if item.isPublished}
						Published
					{:else}
						Draft
					{/if}
				</Badge>
				<a href="{$page.url.pathname}/chapters/{item.id}">
					<Pencil class="w-4 h-4 cursor-pointer hover:opacity-75 transition " />
				</a>
			</div>
		</li>
	{/each}
</ul>
