import type { Course, CourseWithProgressWithCategory } from '$lib/types';
import PocketBase from 'pocketbase';
import { getProgress } from './getProgress';

type GetCourses = {
	userId: string;
	pb: PocketBase;
	title: string;
	categoryId: string;
};
export const getCourses = async ({
	pb,
	categoryId,
	title,
	userId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
	try {
		const courses = await pb
			.collection('courses')
			.getFullList<Course>({
				filter: `isPublished = ${true} && title ?~ "${title}"  && category = "${categoryId}" chapters(course).isPublished = ${true} && purchase(course).user = "${userId}`,
				expand: 'category,purchase(course),chapters(course)',
				fields: '*,expand.*,expand.chapters(course).id',
				sort: '-created'
			})
			.catch(() => []);
		const courseWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
			courses.map(async (course) => {
				console.log(
					"🚀 ~ courses.map ~ course.expand?.['purchase(course)']?.length:",
					course.expand
				);
				if (course.expand?.['purchase(course)']?.length === 0) {
					return {
						...course,
						progress: null
					};
				}
				const progressPercentage = await getProgress({ courseId: course.id, userId, pb });
				if (course.imageUrl) {
					const imageUrl = pb.files.getUrl(course, course.imageUrl);
					course.imageUrl = imageUrl;
				}
				return {
					...course,
					progress: progressPercentage
				};
			})
		);
		return courseWithProgress;
	} catch (error) {
		return [];
	}
};
