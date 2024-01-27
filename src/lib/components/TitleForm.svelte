<script lang="ts">
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Loader2, Pencil } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import { titleSchema } from '$lib/schema';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let form: SuperValidated<typeof titleSchema>;
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
				<Pencil class="h-4 w-4 mr-2" />
				Edit title
			{/if}
		</Button>
	</div>
	{#if !isEditing}
		<p class="text-sm mt-2">
			{form.data.title}
		</p>
	{:else}
		<Form.Root
			method="POST"
			schema={titleSchema}
			action="/teacher/courses/{$page.params.courseId}/?/updateTitle"
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
			<Form.Field {config} name="title">
				<Form.Item>
					<Form.Input disabled={submitting} placeholder="advance web development" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<div class="flex items-center gap-x-2">
				<Form.Button disabled={submitting}
					>{#if delayed}
						<Loader2 class="h-6 w-6 animate-spin " />
					{:else}
						save
					{/if}</Form.Button
				>
			</div>
		</Form.Root>
	{/if}
</div>
