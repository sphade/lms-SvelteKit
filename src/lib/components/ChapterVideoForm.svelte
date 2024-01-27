<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Loader2, Pencil, PlusCircle, UploadCloud, VideoIcon } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { Chapter } from '$lib/types';
	import { onMount } from 'svelte';
	export let initialData: Chapter;

	let isEditing = false;
	let fileInput: FileList | null;
	let uploading = false;
	function toggleEdit() {
		isEditing = !isEditing;
	}
	onMount(async () => {
		await import('@mux/mux-player');
	});
</script>

<div class="mt-6 border bg-muted rounded-md p-4">
	<div class="font-medium flex items-center justify-between">
		Chapter Video

		<Button on:click={toggleEdit} variant="ghost">
			{#if isEditing}
				cancel
			{:else if !initialData.videoUrl}
				<PlusCircle class="h-4 w-4 mr-2" />
				Add a video
			{:else}
				<Pencil class="h-4 w-4 mr-2" />
				Edit image
			{/if}
		</Button>
	</div>
	{#if isEditing}
		<form
			method="post"
			enctype="multipart/form-data"
			action="?/updateVideo"
			use:enhance={() => {
				uploading = true;
				return async ({ update, result }) => {
					await update();
					uploading = false;
					fileInput = null;
					if (result) {
						if (result.type === 'failure') {
							toast.error(result.data?.message?.toString() || '');
						}
						if (result.type === 'error') {
							toast.error(result.error.message);
						}
						if (result.type === 'success') {
							toast.success(result.data?.message?.toString() || '');
							console.log(initialData.videoUrl);
							toggleEdit();
						}
					}
					invalidateAll();
				};
			}}
			class=" mt-4"
		>
			<div class="relative">
				<input
					type="file"
					class=" w-full file:hidden text-transparent h-60 bg-transparent border border-slate-300 rounded-md"
					name="video"
					accept="video/*"
					bind:files={fileInput}
				/>
				<div
					class="absolute pointer-events-none top-1/2 space-y-2 text-center left-1/2 -translate-x-1/2 -translate-y-1/2"
				>
					<UploadCloud class="w-10 h-10 mx-auto " />
					<div>
						<p class="text-blue-600 capitalize font-semibold text-sm">
							choose file or drag and drop
						</p>
						<p class="text-sm">image (4mb)</p>
					</div>
					{#if fileInput?.length === 1}
						<button
							class="px-3 py-2 text-white rounded-md bg-blue-700 capitalize font-semibold pointer-events-auto"
							type="submit"
						>
							{#if uploading}
								<Loader2 class="h-6 w-6 animate-spin " />
							{:else}
								upload {fileInput?.length} file
							{/if}
						</button>
					{/if}
				</div>
			</div>

			<p class="mt-4 text-muted-foreground text-xs">upload this chapter's video</p>
		</form>
	{:else if initialData.videoUrl}
		<mux-player
			playback-id={initialData.expand?.['muxData(chapterId)']?.[0]?.playbackId || ''}
			metadata-video-id="video-id-54321"
			metadata-video-title="Svelte Kit: Episode 2"
			metadata-viewer-user-id="user-id-sveltekit007"
			stream-type="on-demand"
		/>
		<div class="text-xs text-muted-foreground mt-2">
			Videos can take a few minutes to process, refresh the page if video does not appear
		</div>
	{:else}
		<div class="flex items-center justify-center h-60 bg-slate-200 rounded-md">
			<VideoIcon class="h-10 w-10 text-muted-foreground" />
		</div>
	{/if}
	<!-- {#if initialData.videoUrl && !isEditing}
		
	{/if} -->
</div>
