<script lang="ts">
	import { z } from 'zod';
	import * as Form from '$lib/components/ui/form';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import { titleSchema } from '$lib/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';

	import { superForm } from 'sveltekit-superforms';
	export let data;
	const form = superForm(data.form, {
		validators: zodClient(titleSchema),
		onUpdated({ form }) {
			if (form.message) {
				if (!form.valid) {
					toast.error(form.message);
				}
				if (form.valid) {
					toast.success(form.message);
				}
			}
		}
	});

	const { form: formData, enhance, delayed, submitting } = form;
</script>

<div class="max-w-5xl mx-auto flex md:items-center md:justify-center h-full border p-6">
	<div>
		<h1 class="text-2xl">Name your course</h1>
		<p class="text-sm text-muted-foreground">
			what would you like to name your course? don't worry, you can change it later
		</p>
		<form method="POST" action="/teacher/create" class="space-y-8 mt-8" use:enhance>
			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label>Title</Form.Label>
					<Input {...attrs} bind:value={$formData.title} />
				</Form.Control>
				<Form.Description>what would you teach in this course</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex items-center gap-x-2">
				<Button variant="ghost" href="/">cancel</Button>
				<Form.Button disabled={$submitting}
					>{#if $delayed}
						<Loader2 class="size-6 animate-spin " />
					{:else}
						continue
					{/if}</Form.Button
				>
			</div>
		</form>
	</div>
</div>
