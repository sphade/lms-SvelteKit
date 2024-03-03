<script lang="ts">
	import 'quill/dist/quill.snow.css';
	import { onMount } from 'svelte';
	let editor: string | Element;
	import { getFormControl, getFormField } from 'formsnap';
	import type { Infer } from 'sveltekit-superforms';
	import type { chapterDescriptionSchema } from '$lib/schema';
	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	const { attrs } = getFormControl();
	const {
		form: { form }
	} = getFormField<Infer<typeof chapterDescriptionSchema>, 'description'>();

	onMount(async () => {
		const { default: Quill } = await import('quill');
		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
		const initialData = $form.description as string;
		quill.clipboard.dangerouslyPasteHTML(initialData);
		quill.on('text-change', function (delta, oldDelta, source) {
			if (source == 'api') {
				console.log('An API call triggered this change.');
			} else if (source == 'user') {
				$form.description = quill.root.innerHTML;
			}
		});
	});
</script>

<div class="bg-background">
	<input type="text" {...$attrs} hidden bind:value={$form.description} />
	<div bind:this={editor} />
</div>
