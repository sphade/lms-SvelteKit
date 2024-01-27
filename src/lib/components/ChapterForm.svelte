<script lang="ts">
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Loader2, Pencil, PlusCircle } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { chapterTitleSchema } from '$lib/schema';
	import { enhance } from '$app/forms';
	import type { Chapter } from '$lib/types';
	import ChaptersList from './ChaptersList.svelte';
	export let form: SuperValidated<typeof chapterTitleSchema>;
	export let chapters: Chapter[];
	let isUpdating = false;
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
				<PlusCircle class="h-4 w-4 mr-2" />
				Add a chapter
			{/if}
		</Button>
	</div>
	{#if !isCreating}
		<div
			class={cn('text-sm mt-2', {
				'text-slate-500 italic': false
			})}
		>
			No Chapters
		</div>
		<ChaptersList items={chapters} />
		<p class="text-xs text-muted-foreground mt-4">Drag and Drop to reorder the chapters</p>
	{:else}
		<Form.Root
			method="POST"
			schema={chapterTitleSchema}
			action="/teacher/courses/{$page.params.courseId}/?/createChapter"
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
							toggleCreating();
						}
					}
				}
			}}
			class="space-y-4 mt-4"
		>
			<Form.Field {config} name="title">
				<Form.Item>
					<Form.Input placeholder="e.g. introduction to the course" disabled={submitting} />
					<Form.Validation />
				</Form.Item>
			</Form.Field>

			<Form.Button disabled={submitting}
				>{#if delayed}
					<Loader2 class="h-6 w-6 animate-spin " />
				{:else}
					create
				{/if}</Form.Button
			>
		</Form.Root>
	{/if}
</div>
