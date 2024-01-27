<script lang="ts">
	import { Loader2, Trash } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import ConfirmModal from './modals/ConfirmModal.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { confetti } from '@neoconfetti/svelte';

	export let disabled: boolean;
	export let isPublished: boolean;
	let isLoading = false;
	let openConfetti = false;
</script>

{#if openConfetti}
	<div class="overflow-hidden" use:confetti={{ force: 0.1, destroyAfterDone: false }} />
{/if}

<div class="flex items-center gap-x-2">
	<form
		use:enhance={() => {
			isLoading = true;
			return async ({ update, result }) => {
				await update();
				isLoading = false;

				if (result) {
					if (result.type === 'failure') {
						toast.error(result.data?.message?.toString() || '');
					}
					if (result.type === 'error') {
						toast.error(result.error.message);
					}
					if (result.type === 'success') {
						toast.success(result.data?.message?.toString() || '');
						if (result.data?.confetti) {
							openConfetti = true;
							setTimeout(() => {
								openConfetti = false;
							}, 3000);
						}
					}
				}
			};
		}}
		action="?/updatePublish"
		method="POST"
	>
		<Button type="submit" {disabled} variant="outline" size="sm">
			{#if isLoading}
				<Loader2 class="h-6 w-6 animate-spin " />
			{:else if isPublished}
				Unpublish
			{:else}
				publish
			{/if}
		</Button>
	</form>
	<ConfirmModal action="?/deleteCourse">
		<Button size="icon">
			<Trash class="h-4 w-4" />
		</Button>
	</ConfirmModal>
</div>
