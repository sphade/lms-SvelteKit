<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Sidebar from './Sidebar.svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger class=" md:hidden pr-4 hover:opacity-75  transition "><Menu /></Sheet.Trigger>
	<Sheet.Content class=" md:hidden p-0 bg-background" side="left">
		<Sidebar />
	</Sheet.Content>
</Sheet.Root>
