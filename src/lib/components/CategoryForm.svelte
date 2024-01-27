<script lang="ts">
	import { Check, ChevronsUpDown, Loader2, Pencil } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import type { Category } from '$lib/types';
	export let categories: Category[];
	import { toast } from 'svelte-sonner';

	import type { SuperValidated } from 'sveltekit-superforms';
	import { categorySchema } from '$lib/schema';
	export let form: SuperValidated<typeof categorySchema>;
	$: selectedValue = categories.find((category) => category.id === form.data.category)?.name;
	let isEditing = false;
	function toggleEdit() {
		isEditing = !isEditing;
	}
</script>

<div class="mt-6 border bg-muted rounded-md p-4">
	<div class="font-medium flex items-center justify-between">
		Course category

		<Button on:click={toggleEdit} variant="ghost">
			{#if isEditing}
				cancel
			{:else}
				<Pencil class="h-4 w-4 mr-2" />
				Edit category
			{/if}
		</Button>
	</div>
	{#if !isEditing}
		<p
			class={cn('text-sm mt-2', {
				'text-muted-foreground': !form.data.category
			})}
		>
			{selectedValue || 'No category'}
		</p>
	{:else}
		<Form.Root
			{form}
			schema={categorySchema}
			let:config
			let:delayed
			let:submitting
			method="POST"
			action="?/updateCategory"
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
			class="w-full space-y-6"
		>
			<Form.Field {config} name="category">
				<Form.Item class="bg-white">
					<Form.Select disabled={submitting}>
						<Form.SelectTrigger placeholder="Select a category" />
						<Form.SelectContent class="!w-60">
							{#each categories as category}
								<Form.SelectItem value={category.id}>{category.name}</Form.SelectItem>
							{/each}
						</Form.SelectContent>
					</Form.Select>

					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Button>
				{#if delayed}
					<Loader2 class="h-6 w-6 animate-spin " />
				{:else}
					save
				{/if}
			</Form.Button>
		</Form.Root>
	{/if}
</div>
