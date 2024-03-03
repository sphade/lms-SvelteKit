<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Loader2, Pencil } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { cn } from '$lib/utils';
	import { chapterDescriptionSchema } from '$lib/schema';
	import Editor from './Editor.svelte';

	import 'quill/dist/quill.snow.css';
	import Preview from './Preview.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<typeof chapterDescriptionSchema>>;
	const form = superForm(data, {
		validators: zodClient(chapterDescriptionSchema),
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
		Course description

		<Button on:click={toggleEdit} variant="ghost">
			{#if isEditing}
				cancel
			{:else}
				<Pencil class="size-4 mr-2" />
				Edit description
			{/if}
		</Button>
	</div>
	{#if !isEditing}
		<p
			class={cn('text-sm mt-2 break-all', {
				'text-muted-foreground': !data.data.description || data.data.description === '<p><br></p>'
			})}
		>
			{#if !data.data.description || data.data.description === '<p><br></p>'}
				No description
			{:else}
				<Preview value={data.data.description} />
			{/if}
		</p>
	{:else}
		<form method="POST" action="?/updateDescription" use:enhance class="space-y-4 mt-4">
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>

					<Editor />
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
