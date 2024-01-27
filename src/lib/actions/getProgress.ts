import type { Chapter } from '$lib/types';
import PocketBase from 'pocketbase';

export async function getProgress({
	pb,
	userId,
	courseId
}: {
	pb: PocketBase;
	userId: string;
	courseId: string;
}) {
	try {
		const publishedChapters = await pb
			.collection('chapters')
			.getFullList<Chapter>({
				filter: `isPublished = ${true} && course = "${courseId}" `,
				fields: 'id'
			})
			.catch(() => []);
		const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);
		console.log('🚀 ~ publishedChaptersIds:', publishedChaptersIds);
		const validCompletedChapters = await pb
			.collection('userProgress')
			.getFullList({
				filter: `user = "${userId}" && chapters ~ "${publishedChaptersIds}" isCompleted = "${true}"`
			})
			.catch(() => []); // Return an empty array if an error occurs
		console.log('🚀 ~ validCompletedChapters ~ validCompletedChapters:', validCompletedChapters);
		const progressPercentage = (validCompletedChapters.length / publishedChaptersIds.length) * 100;
		console.log('🚀 ~ progressPercentage:', progressPercentage);

		return progressPercentage;
	} catch {
		return 0;
	}
}
