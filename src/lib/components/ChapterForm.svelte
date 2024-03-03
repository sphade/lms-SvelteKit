<script lang="ts">
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Loader2, Pencil, PlusCircle } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { chapterTitleSchema } from '$lib/schema';
	import type { Chapter } from '$lib/types';
	import ChaptersList from './ChaptersList.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Input from './ui/input/input.svelte';
	export let data: SuperValidated<Infer<typeof chapterTitleSchema>>;
	const form = superForm(data, {
		validators: zodClient(chapterTitleSchema),
		onUpdated({ form }) {
			if (form.message) {
				if (!form.valid) {
					toast.error(form.message);
				}
				if (form.valid) {
					toast.success(form.message);
					toggleCreating();
				}
			}
		}
	});
	const { form: formData, enhance, delayed, submitting } = form;
	export let chapters: Chapter[];
	console.log('🚀 ~ chapters:', chapters);
	let isCreating = false;
	function toggleCreating() {
		isCreating = !isCreating;
	}
</script>

<div class="mt-6 border bg-muted rounded-md p-4">
	<div class="font-medium flex items-center justify-between">
		Course Chapters

		<Button on:click={toggleCreating} variant="ghost">
			{#if isCreating}
				cancel
			{:else}
				<PlusCircle class="size-4 mr-2" />
				Add a chapter
			{/if}
		</Button>
	</div>
	{#if isCreating}
		<form
			method="POST"
			use:enhance
			action="/teacher/courses/{$page.params.courseId}/?/createChapter"
			class="space-y-4 mt-4"
		>
			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label>Title</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.title}
						placeholder="e.g. introduction to the course"
						disabled={$submitting}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button disabled={$submitting}
				>{#if $delayed}
					<Loader2 class="size-6 animate-spin " />
				{:else}
					create
				{/if}</Form.Button
			>
		</form>
	{:else if chapters.length}
		<ChaptersList items={chapters} />
		<p class="text-xs text-muted-foreground mt-4">Drag and Drop to reorder the chapters</p>
	{:else}
		<div class="text-sm mt-2 text-slate-500 italic">No Chapters</div>
	{/if}
</div>
