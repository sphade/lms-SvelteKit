<script lang="ts">
	import 'quill/dist/quill.snow.css';
	import { onMount } from 'svelte';
	let editor: string | Element;
	import { getFormField } from 'formsnap';
	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];
	const { attrStore, value } = getFormField();

	onMount(async () => {
		const { default: Quill } = await import('quill');
		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
		const initialData = $value as string;
		quill.clipboard.dangerouslyPasteHTML(initialData);
		quill.on('text-change', function (delta, oldDelta, source) {
			if (source == 'api') {
				console.log('An API call triggered this change.');
			} else if (source == 'user') {
				$value = quill.root.innerHTML;
			}
		});
	});
</script>

<div class="bg-background">
	<input type="text" {...$attrStore} hidden bind:value={$value} />
	<div bind:this={editor} />
</div>
