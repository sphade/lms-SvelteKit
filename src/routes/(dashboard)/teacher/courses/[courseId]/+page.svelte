<script lang="ts">
	import { page } from '$app/stores';
	import Actions from '$lib/components/Actions.svelte';
	import AttachmentForm from '$lib/components/AttachmentForm.svelte';
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import ChapterForm from '$lib/components/ChapterForm.svelte';
	import DescriptionForm from '$lib/components/DescriptionForm.svelte';
	import IconBadge from '$lib/components/IconBadge.svelte';
	import ImageForm from '$lib/components/ImageForm.svelte';
	import PriceForm from '$lib/components/PriceForm.svelte';
	import TitleForm from '$lib/components/TitleForm.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import {
		AlertTriangle,
		CircleDollarSign,
		File,
		LayoutDashboard,
		ListChecks
	} from 'lucide-svelte';
	export let data;
	$: course = data.course;
	$: requiredField = [
		course.title,
		course.description,
		course.imageUrl,
		course.price,
		course.category,
		course.expand?.['chapters(course)']?.some((chapter) => chapter.isPublished)
	];
	$: totalFields = requiredField.length;
	$: completedFields = requiredField.filter(Boolean).length;

	$: completionText = `(${completedFields}/${totalFields})`;
	$: isComplete = requiredField.every(Boolean);
</script>

{#if !course.isPublished}
	<Alert.Root class="bg-yellow-200/80 border border-yellow-300 rounded-none ">
		<AlertTriangle class="size-4" />
		<Alert.Title>Heads up!</Alert.Title>
		<Alert.Description
			>This course is unpublished , It will not be visible to the students</Alert.Description
		>
	</Alert.Root>
{/if}
<div class="p-6">
	<div class="flex items-center justify-between">
		<div class="flex flex-col gap-y-2">
			<h1 class="text-2xl font-medium">Course setup</h1>
			<span class="text-sm text-muted-foreground">
				complete all fields {completionText}
			</span>
		</div>
		<!-- add actions -->
		<Actions disabled={!isComplete} isPublished={course.isPublished} />
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
		<div>
			<div class="flex items-center gap-x-2">
				<IconBadge icon={LayoutDashboard} />
				<h2 class="text-xl">Customize your course</h2>
			</div>
			<TitleForm data={data.titleForm} />
			<DescriptionForm data={data.descriptionForm} />
			<ImageForm imageUrl={course.imageUrl} />
			<CategoryForm categories={data.categories} data={data.categoryForm} />
		</div>
		<div class="space-y-6">
			<div>
				<div class="flex items-center gap-x-2">
					<IconBadge icon={ListChecks} />
					<h2 class="text-xl">Course chapters</h2>
				</div>
				<ChapterForm
					chapters={data.course.expand?.['chapters(course)'] ?? []}
					data={data.chapterTitleForm}
				/>
			</div>
			<div>
				<div class="flex items-center gap-x-2">
					<IconBadge icon={CircleDollarSign} />
					<h2 class="text-xl">Sell your course</h2>
				</div>
				<PriceForm data={data.priceForm} />
			</div>
			<div>
				<div class="flex items-center gap-x-2">
					<IconBadge icon={File} />
					<h2 class="text-xl">Resources & Attachments</h2>
				</div>
				<AttachmentForm attachments={data.course?.expand?.['attachments(course)'] ?? []} />
			</div>
		</div>
	</div>
</div>
