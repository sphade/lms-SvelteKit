<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { cn } from '$lib/utils';
	export let value: boolean;
</script>

<Badge
	class={cn('bg-slate-500', {
		'bg-sky-700': value
	})}
>
	{#if value}
		Published
	{:else}
		Draft
	{/if}
</Badge>
