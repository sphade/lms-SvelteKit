<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Files, ImageIcon, Loader2, Pencil, PlusCircle, UploadCloud, X } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { cn } from '$lib/utils';
	import type { Attachment } from '$lib/types';
	import { fly, slide } from 'svelte/transition';

	export let attachments: Attachment[] = [];

	let isEditing = false;
	let fileInput: FileList | null;
	let deletingId: string | null = null;
	let deleting: string[] = [];
	let uploading = false;
	function toggleEdit() {
		isEditing = !isEditing;
	}
</script>

<div class="mt-6 border bg-muted rounded-md p-4">
	<div class="font-medium flex items-center justify-between">
		Course attachments

		<Button on:click={toggleEdit} variant="ghost">
			{#if isEditing}
				cancel
			{:else if !attachments.length}
				<PlusCircle class="h-4 w-4 mr-2" />
				add a file
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
			action="?/createAttachment"
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
					name="file"
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
						<p class="text-sm">text, image, video, audio, and pdf</p>
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

			<p class="mt-4 text-muted-foreground text-xs">
				Add anything your students might need to complete this course
			</p>
		</form>
	{:else if attachments.length}
		{#each attachments.filter((attachment) => !deleting.includes(attachment.id)) as attachment (attachment.id)}
			<div
				class="flex items-center p-3 w-full gap-x-2 bg-sky-100 border-sky-200 border text-sky-700 rounded-md mb-2"
				in:fly={{ y: 20 }}
				out:slide
			>
				<Files className="w-4 h-4 m-2 flex-shrink-0" />

				<p class="text-xs line-clamp-1">
					{attachment.name}
				</p>
				<form
					action="?/deleteAttachment"
					method="POST"
					use:enhance={() => {
						deleting = [...deleting, attachment.id];
						toast.success('successfully deleted course attachment');

						return async ({ update, result }) => {
							await update();
							deleting = deleting.filter((id) => id !== attachment.id);
							if (result) {
								if (result.type === 'failure') {
									toast.error(result.data?.message?.toString() || '');
								}
								if (result.type === 'error') {
									toast.error(result.error.message);
								}
							}
						};
					}}
					class="ml-auto"
				>
					<input type="hidden" name="id" value={attachment.id} />

					<button class=" hover:opacity-75 transition-all">
						<X class="h-4 w-4 " />
					</button>
				</form>
			</div>
		{/each}
	{:else}
		<p class="text-sm mt-2 text-muted-foreground italic">No attachment yet</p>
	{/if}
</div>
