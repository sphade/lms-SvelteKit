<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { LogOut } from 'lucide-svelte';

	export let data;
</script>

<div>
	{data.user?.email}
</div>

<form action="?/logout" method="POST" use:enhance>
	<Button type="submit"><LogOut class="mr-2" /> logout</Button>
</form>
