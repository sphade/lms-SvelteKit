<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Loader2, Pencil } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { cn } from '$lib/utils';
	import { chapterAccessSchema } from '$lib/schema';

	export let form: SuperValidated<typeof chapterAccessSchema>;
	let isEditing = false;

	function toggleEdit() {
		isEditing = !isEditing;
	}
</script>

<div class="mt-6 border bg-muted rounded-md p-4">
	<div class="font-medium flex items-center justify-between">
		Course access

		<Button on:click={toggleEdit} variant="ghost">
			{#if isEditing}
				cancel
			{:else}
				<Pencil class="h-4 w-4 mr-2" />
				Edit access
			{/if}
		</Button>
	</div>
	{#if !isEditing}
		<p
			class={cn('text-sm mt-2 break-all', {
				'text-muted-foreground italic': !form.data.isFree
			})}
		>
			{#if form.data.isFree}
				This chapter is free for preview
			{:else}
				This chapter is not free
			{/if}
		</p>
	{:else}
		<Form.Root
			method="POST"
			schema={chapterAccessSchema}
			action="?/updateAccess"
			{form}
			let:config
			let:delayed
			let:submitting
			options={{
				onUpdated({ form }) {
					if (form.message) {
						if (!form.valid) {
							toast.error(form.message);
						}
						if (form.valid) {
							toast.success(form.message);
							toggleEdit();
						}
					}
				}
			}}
			class="space-y-4 mt-4"
		>
			<Form.Field {config} name="isFree">
				<Form.Item class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
					<Form.Checkbox />

					<div class="space-y-1 leading-none">
						<Form.Label>
							Check this box if you want to make this chapter free for preview
						</Form.Label>
					</div>
				</Form.Item>
			</Form.Field>

			<Form.Button disabled={submitting}
				>{#if delayed}
					<Loader2 class="h-6 w-6 animate-spin " />
				{:else}
					save
				{/if}</Form.Button
			>
		</Form.Root>
	{/if}
</div>
