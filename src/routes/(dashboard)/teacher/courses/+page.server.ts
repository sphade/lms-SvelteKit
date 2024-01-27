import type { Course } from '$lib/types';

export const load = async ({ locals: { pb, user } }) => {
	async function getCourses() {
		const courses = await pb.collection('courses').getFullList<Course>({
			sort: '-created',
			filter: `user = "${user?.id}"`
		});
		console.log('🚀 ~ courses ~ courses:', courses);
		return courses;
	}
	return {
		courses: await getCourses()
	};
};
