<script lang="ts">
	import { onMount } from 'svelte';
	let editor: string | Element;
	import 'quill/dist/quill.bubble.css';
	export let value: string;

	onMount(async () => {
		const { default: Quill } = await import('quill');
		let quill = new Quill(editor, {
			theme: 'bubble',
			readOnly: true
		});
		quill.clipboard.dangerouslyPasteHTML(value);
	});
</script>

<div bind:this={editor} />
