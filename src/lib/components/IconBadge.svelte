<script lang="ts">
	import { tv, type VariantProps } from 'tailwind-variants';
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import { cn } from '$lib/utils';
	const iconVariants = tv({
		base: 'rounded-full flex items-center justify-center',
		variants: {
			variant: {
				default: 'bg-sky-100 text-sky-700',
				success: 'bg-emerald-100  text-emerald-700'
			},

			size: {
				default: 'p-2 h-10 w-10',
				sm: 'p-1 size-6 '
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});
	// type Variant = VariantProps<typeof iconVariants>['variant'];
	// type Size = VariantProps<typeof iconVariants>['size'];
	type IconVariants = VariantProps<typeof iconVariants>;

	type Props = IconVariants & {
		icon: ComponentType<Icon>;
	};
	type $$Props = Props;

	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let icon: $$Props['icon'];
</script>

<div class={cn(iconVariants({ variant, size }))}>
	<svelte:component this={icon} />
</div>
