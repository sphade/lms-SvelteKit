<script lang="ts">
	import Logo from './Logo.svelte';
	import SidebarRoutes from './SidebarRoutes.svelte';
</script>

<div class="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
	<div class="p-6">
		<Logo />
	</div>
	<div class="flex flex-col w-full">
		<SidebarRoutes />
	</div>
</div>
