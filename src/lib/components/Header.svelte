<script lang="ts">
	import Logo from './Logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { AlignRight } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
</script>

<header class="flex items-center justify-between px-8 py-5">
	<Logo />
	<div class="flex items-center gap-5">
		<Button variant="link" class="text-sm  hidden lg:inline-block">How it works</Button>
		<Button variant="link" class="text-sm  hidden lg:inline-block">List an item</Button>
		<Button variant="ghost" size="lg" class="rounded-full text-lg hidden md:inline-block"
			>Login or signup</Button
		>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger><AlignRight /></DropdownMenu.Trigger>
			<DropdownMenu.Content class=" font-medium">
				<DropdownMenu.Item class="md:hidden">Sign In / Register</DropdownMenu.Item>
				<DropdownMenu.Item class="lg:hidden">Get Help</DropdownMenu.Item>
				<DropdownMenu.Item>List An Item</DropdownMenu.Item>
				<DropdownMenu.Item>How It Works</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>
