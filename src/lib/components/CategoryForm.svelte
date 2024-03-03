<script lang="ts">
	import { Check, ChevronsUpDown, Loader2, Pencil } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import type { Category } from '$lib/types';
	export let categories: Category[];
	import { toast } from 'svelte-sonner';

	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { categorySchema } from '$lib/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '$lib/components/ui/select';

	export let data: SuperValidated<Infer<typeof categorySchema>>;
	const form = superForm(data, {
		validators: zodClient(categorySchema),
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
	$: selectedValue = categories.find((category) => category.id === $formData.category)?.name;
	console.log('🚀 ~ selectedValue:', selectedValue);
	let isEditing = false;
	function toggleEdit() {
		isEditing = !isEditing;
	}
	$: selectedCategory = $formData.category
		? {
				label: selectedValue,
				value: $formData.category
			}
		: undefined;
</script>

<div class="mt-6 border bg-muted rounded-md p-4">
	<div class="font-medium flex items-center justify-between">
		Course category

		<Button on:click={toggleEdit} variant="ghost">
			{#if isEditing}
				cancel
			{:else}
				<Pencil class="size-4 mr-2" />
				Edit category
			{/if}
		</Button>
	</div>
	{#if !isEditing}
		<p
			class={cn('text-sm mt-2', {
				'text-muted-foreground': !data.data.category
			})}
		>
			{selectedValue || 'No category'}
		</p>
	{:else}
		<form method="POST" action="?/updateCategory" use:enhance class="w-full space-y-6">
			<Form.Field {form} name="category">
				<Form.Control let:attrs>
					<Select.Root
						selected={selectedCategory}
						onSelectedChange={(v) => {
							v && ($formData.category = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select a category" />
						</Select.Trigger>
						<Select.Content class="w-60">
							{#each categories as category}
								<Select.Item value={category.id} label={category.name}>{category.name}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.category} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button>
				{#if $delayed}
					<Loader2 class="size-6 animate-spin " />
				{:else}
					save
				{/if}
			</Form.Button>
		</form>
	{/if}
</div>
