<script lang="ts">
	import { enhance } from '$app/forms';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { toast } from 'svelte-sonner';
	import Button from '../ui/button/button.svelte';
	import { Loader2 } from 'lucide-svelte';
	export let action: string;
	let isDeleting: boolean;
	let open: boolean;
	function toggleModal() {
		open = !open;
	}
</script>

<AlertDialog.Root {open} onOpenChange={toggleModal}>
	<AlertDialog.Trigger>
		<slot />
	</AlertDialog.Trigger>
	<!-- <AlertDialog.Overlay class="bg-black" /> -->
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form
				{action}
				use:enhance={() => {
					isDeleting = true;
					return async ({ update, result }) => {
						await update();
						isDeleting = false;

						toggleModal();
						if (result) {
							if (result.type === 'failure') {
								toast.error(result.data?.message?.toString() || '');
							}
							if (result.type === 'error') {
								toast.error(result.error.message);
							}
							if (result.type === 'success') {
								toast.success(result.data?.message?.toString() || '');
							}
						}
					};
				}}
				method="POST"
			>
				<Button class="w-full" type="submit">
					{#if isDeleting}
						<Loader2 class="h-6 w-6 animate-spin " />
					{:else}
						Continue
					{/if}
				</Button>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
