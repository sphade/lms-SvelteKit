<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Loader2, Pencil } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { cn } from '$lib/utils';
	import { chapterAccessSchema } from '$lib/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Checkbox from './ui/checkbox/checkbox.svelte';

	export let data: SuperValidated<Infer<typeof chapterAccessSchema>>;
	const form = superForm(data, {
		validators: zodClient(chapterAccessSchema),
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
	});
	const { form: formData, enhance, delayed, submitting } = form;
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
				<Pencil class="size-4 mr-2" />
				Edit access
			{/if}
		</Button>
	</div>
	{#if !isEditing}
		<p
			class={cn('text-sm mt-2 break-all', {
				'text-muted-foreground italic': !data.data.isFree
			})}
		>
			{#if data.data.isFree}
				This chapter is free for preview
			{:else}
				This chapter is not free
			{/if}
		</p>
	{:else}
		<form method="POST" action="?/updateAccess" use:enhance class="space-y-4 mt-4">
			<Form.Field
				{form}
				name="isFree"
				class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
			>
				<Form.Control let:attrs>
					<Checkbox {...attrs} bind:checked={$formData.isFree} />
					<div class="space-y-1 leading-none">
						<Form.Label>Check this box if you want to make this chapter free for preview</Form.Label
						>
					</div>
					<input name={attrs.name} value={$formData.isFree} hidden />
				</Form.Control>
			</Form.Field>

			<Form.Button disabled={$submitting}
				>{#if $delayed}
					<Loader2 class="size-6 animate-spin " />
				{:else}
					save
				{/if}</Form.Button
			>
		</form>
	{/if}
</div>
