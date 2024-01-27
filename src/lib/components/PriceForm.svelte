<script lang="ts">
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Loader2, Pencil } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import { cn, formatCurrency } from '$lib/utils';
	import { priceSchema } from '$lib/schema';
	export let form: SuperValidated<typeof priceSchema>;
	let isEditing = false;
	function toggleEdit() {
		isEditing = !isEditing;
	}

	$: price = form.data.price!;
</script>

<div class="mt-6 border bg-muted rounded-md p-4">
	<div class="font-medium flex items-center justify-between">
		Course price

		<Button on:click={toggleEdit} variant="ghost">
			{#if isEditing}
				cancel
			{:else}
				<Pencil class="h-4 w-4 mr-2" />
				Edit price
			{/if}
		</Button>
	</div>
	{#if !isEditing}
		<p
			class={cn('text-sm mt-2 break-all', {
				'text-muted-foreground': !form.data.price
			})}
		>
			{(price && formatCurrency(price)) || 'No price'}
		</p>
	{:else}
		<Form.Root
			method="POST"
			schema={priceSchema}
			action="/teacher/courses/{$page.params.courseId}/?/updatePrice"
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
			<Form.Field {config} name="price">
				<Form.Item>
					<Form.Input
						step="0.01"
						type="number"
						placeholder="set a price for your course"
						disabled={submitting}
					/>
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
