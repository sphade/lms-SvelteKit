<script lang="ts">
	import { page } from '$app/stores';
	import ChapterAccessForm from '$lib/components/ChapterAccessForm.svelte';
	import ChapterDescriptionForm from '$lib/components/ChapterDescriptionForm.svelte';
	import ChapterTitleForm from '$lib/components/ChapterTitleForm.svelte';
	import ChapterVideoForm from '$lib/components/ChapterVideoForm.svelte';
	import IconBadge from '$lib/components/IconBadge.svelte';
	import { AlertTriangle, ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import ChapterActions from '$lib/components/ChapterActions.svelte';
	export let data;
	$: chapter = data.chapter;

	$: requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
	$: totalFields = requiredFields.length;
	$: completedFields = requiredFields.filter(Boolean).length;
	$: completionText = `(${completedFields}/${totalFields})`;
	$: isComplete = requiredFields.every(Boolean);
</script>

{#if !chapter.isPublished}
	<Alert.Root class="bg-yellow-200/80 border border-yellow-300 rounded-none ">
		<AlertTriangle class="h-4 w-4" />
		<Alert.Title>Heads up!</Alert.Title>
		<Alert.Description
			>This chapter is unpublished , It will not be visible in the course</Alert.Description
		>
	</Alert.Root>
{/if}
<div class="p-6">
	<div class="flex items-center justify-between">
		<div class="w-full">
			<a
				href="/teacher/courses/{$page.params.courseId}"
				class="flex items-center text-sm hover:opacity-75 transition mb-6"
			>
				<ArrowLeft class="h-4 w-4 mr-2" />
				Back to course
			</a>
			<div class="flex items-center justify-between w-full">
				<div class="flex flex-col gap-y-2">
					<h1 class="text-2xl font-medium">Chapter Creation</h1>
					<span class="text-sm text-slate-700">Complete all fields {completionText} </span>
				</div>
				<ChapterActions disabled={!isComplete} isPublished={chapter.isPublished} />
			</div>
		</div>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
		<div class="space-y-4">
			<div>
				<div class="flex items-center gap-x-2">
					<IconBadge icon={LayoutDashboard} />
					<h2 class="text-xl">Customize your chapter</h2>
				</div>
				<ChapterTitleForm form={data.chapterTitleForm} />
				<ChapterDescriptionForm form={data.chapterDescriptionForm} />
			</div>
			<div>
				<div class="flex items-center gap-x-2">
					<IconBadge icon={Eye} />
					<h2 class="text-xl">Access Settings</h2>
				</div>
				<ChapterAccessForm form={data.chapterAccessForm} />
			</div>
		</div>
		<div>
			<div class="flex items-center gap-x-2">
				<IconBadge icon={Video} />
				<h2 class="text-xl">Add a video</h2>
			</div>
			<ChapterVideoForm initialData={data.chapter} />
		</div>
	</div>
</div>
