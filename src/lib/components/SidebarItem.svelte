<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	export let icon: ComponentType<Icon>;
	export let label: string;
	export let href: string;
	$: pathname = $page.url.pathname;
	$: isActive =
		(pathname === '/' && href === '/') || pathname === href || pathname?.startsWith(`${href}/`);
</script>

<a
	class={cn(
		'flex items-center gap-x-2 text-muted-foreground text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-muted',
		{
			'text-primary bg-primary/20 hover:bg-primary/20 hover:text-primary': isActive
		}
	)}
	{href}
>
	<div class="flex items-center gap-x-2 py-4">
		<svelte:component
			this={icon}
			class={cn('text-muted-foreground', {
				'text-primary': isActive
			})}
			size={22}
		/>
		{label}
	</div>
	<div
		class={cn('ml-auto opacity-0 border-2 border-primary h-full transition-all', {
			'opacity-100': isActive
		})}
	/>
</a>
