<script lang="ts">
	import { z } from 'zod';
	import * as Form from '$lib/components/ui/form';
	import { Loader2 } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	const formSchema = z.object({
		title: z.string().min(1)
	});
	export let data;
	import { toast } from 'svelte-sonner';
</script>

<div class="max-w-5xl mx-auto flex md:items-center md:justify-center h-full border p-6">
	<div>
		<h1 class="text-2xl">Name your course</h1>
		<p class="text-sm text-muted-foreground">
			what would you like to name your course? don't worry, you can change it later
		</p>
		<Form.Root
			method="POST"
			schema={formSchema}
			action="/teacher/create"
			form={data.form}
			let:config
			let:delayed
			let:submitting
			let:message
			options={{
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
			}}
			class="space-y-8 mt-8"
		>
			<Form.Field {config} name="title">
				<Form.Item>
					<Form.Label>Course title</Form.Label>
					<Form.Input disabled={submitting} />
					<Form.Description>what would you teach in this course</Form.Description>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<div class="flex items-center gap-x-2">
				<Button variant="ghost" href="/">cancel</Button>
				<Form.Button disabled={submitting}
					>{#if delayed}
						<Loader2 class="h-6 w-6 animate-spin " />
					{:else}
						continue
					{/if}</Form.Button
				>
			</div>
		</Form.Root>
	</div>
</div>
