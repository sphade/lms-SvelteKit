<script lang="ts">
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Loader2, Pencil } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import { cn, formatCurrency } from '$lib/utils';
	import { priceSchema } from '$lib/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Input from './ui/input/input.svelte';
	export let data: SuperValidated<Infer<typeof priceSchema>>;
	const form = superForm(data, {
		validators: zodClient(priceSchema),
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

	$: price = data.data.price!;
</script>

<div class="mt-6 border bg-muted rounded-md p-4">
	<div class="font-medium flex items-center justify-between">
		Course price

		<Button on:click={toggleEdit} variant="ghost">
			{#if isEditing}
				cancel
			{:else}
				<Pencil class="size-4 mr-2" />
				Edit price
			{/if}
		</Button>
	</div>
	{#if !isEditing}
		<p
			class={cn('text-sm mt-2 break-all', {
				'text-muted-foreground': !data.data.price
			})}
		>
			{(price && formatCurrency(price)) || 'No price'}
		</p>
	{:else}
		<form
			method="POST"
			action="/teacher/courses/{$page.params.courseId}/?/updatePrice"
			use:enhance
			class="space-y-4 mt-4"
		>
			<Form.Field {form} name="price">
				<Form.Control let:attrs>
					<Form.Label>Price</Form.Label>
					<Input
						{...attrs}
						step="0.01"
						type="number"
						placeholder="set a price for your course"
						disabled={$submitting}
						bind:value={$formData.price}
					/>
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
