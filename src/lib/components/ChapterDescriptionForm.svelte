<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Loader2, Pencil } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { cn } from '$lib/utils';
	import { chapterDescriptionSchema } from '$lib/schema';
	import Editor from './Editor.svelte';

	import 'quill/dist/quill.snow.css';
	import Preview from './Preview.svelte';

	export let form: SuperValidated<typeof chapterDescriptionSchema>;
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
				<Pencil class="h-4 w-4 mr-2" />
				Edit description
			{/if}
		</Button>
	</div>
	{#if !isEditing}
		<p
			class={cn('text-sm mt-2 break-all', {
				'text-muted-foreground': !form.data.description || form.data.description === '<p><br></p>'
			})}
		>
			{#if !form.data.description || form.data.description === '<p><br></p>'}
				No description
			{:else}
				<Preview value={form.data.description} />
			{/if}
		</p>
	{:else}
		<Form.Root
			method="POST"
			schema={chapterDescriptionSchema}
			action="?/updateDescription"
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
			<Form.Field {config} name="description">
				<Form.Item>
					<Editor />
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
