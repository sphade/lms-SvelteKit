<script lang="ts">
	import { BookOpen } from 'lucide-svelte';
	import IconBadge from './IconBadge.svelte';
	import { formatCurrency } from '$lib/utils';

	export let id: string;
	export let title: string;
	export let imageUrl: string | undefined;
	export let price: number | undefined;
	export let progress: number | null;
	export let category: string | undefined;
	export let chapterLength: number | undefined;
	console.log('🚀 ~ progress:', progress);
</script>

<a href="/courses/{id}" class="">
	<div class="group hover:shadow-sm transition overflow-hidden border rounded-lg p3 h-full">
		<img alt={title} class="object-cover w-full aspect-video rounded-md" src={imageUrl} />
		<div class="flex flex-col p-2">
			<div
				class="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2"
			>
				{title}
			</div>
			<p class="text-xs text-muted-foreground">
				{category}
			</p>
			<div class="my-3 flex items-center gap-x-2 text-sm md:text-xs">
				<div class="flex items-center gap-x-1 text-slate-500">
					<IconBadge size="sm" icon={BookOpen} />
					<span
						>{chapterLength}
						{#if chapterLength === 1}
							chapter
						{:else}
							chapters
						{/if}
					</span>
				</div>
			</div>
			{#if progress !== null}
				<div>TODO: Progress component</div>
			{:else}
				<p>
					{formatCurrency(price || 0)}
				</p>
			{/if}
		</div>
	</div>
</a>
