<script lang="ts">
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Loader2, Pencil } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import { titleSchema } from '$lib/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Input from './ui/input/input.svelte';
	type TitleSchema = typeof titleSchema;
	export let data: SuperValidated<Infer<TitleSchema>>;
	const form = superForm(data, {
		validators: zodClient(titleSchema),
		resetForm: false,
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
		Course title

		<Button on:click={toggleEdit} type="button" variant="ghost">
			{#if isEditing}
				cancel
			{:else}
				<Pencil class="size-4 mr-2" />
				Edit title
			{/if}
		</Button>
	</div>
	{#if !isEditing}
		<p class="text-sm mt-2">
			{data.data.title}
		</p>
	{:else}
		<form
			method="POST"
			action="/teacher/courses/{$page.params.courseId}/?/updateTitle"
			use:enhance
			class="space-y-4 mt-4"
		>
			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label>Title</Form.Label>
					<Input {...attrs} placeholder="advance web development" bind:value={$formData.title} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex items-center gap-x-2">
				<Form.Button disabled={$submitting}
					>{#if $delayed}
						<Loader2 class="size-6 animate-spin " />
					{:else}
						save
					{/if}</Form.Button
				>
			</div>
		</form>
	{/if}
</div>
