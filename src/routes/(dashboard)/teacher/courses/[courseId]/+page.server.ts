import { type Attachment, type Category, type Chapter, type Course } from '$lib/types';
import { error, fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { ClientResponseError } from 'pocketbase';
import {
	categorySchema,
	chapterTitleSchema,
	descriptionSchema,
	priceSchema,
	titleSchema
} from '$lib/schema.js';
import Mux from '@mux/mux-node';
import { MUX_TOKEN_ID, MUX_TOKEN_SECRET } from '$env/static/private';
const { Video } = new Mux(MUX_TOKEN_ID, MUX_TOKEN_SECRET);

export const load = async ({ params, locals: { pb, user } }) => {
	const { courseId } = params;
	const userId = user?.id;
	if (!userId) {
		redirect(308, '/');
	}
	async function getCourse() {
		try {
			const course = await pb.collection('courses').getOne<Course>(courseId, {
				expand: 'category, attachments(course), chapters(course)'
			});
			if (course.imageUrl) {
				const imageUrl = pb.files.getUrl(course, course.imageUrl);
				course.imageUrl = imageUrl;
			}
			return course;
		} catch (e) {
			const { status } = e as ClientResponseError;

			if (status === 404) error(400, 'course does not exist');
			redirect(308, '/');
		}
	}
	async function getCategories() {
		try {
			const categories = await pb.collection('categories').getFullList<Category>({
				sort: '-created'
			});
			return categories;
		} catch (e) {
			const { status } = e as ClientResponseError;

			if (status === 404) redirect(308, '/');
			error(400, 'an error occurred');
		}
	}
	// async function getAttachments() {
	// 	try {
	// 		const categories = await pb.collection('attachments').getFullList<Attachment>({
	// 			sort: '-created',
	// 			filter: `course = "${courseId}"`
	// 		});
	// 		return categories;
	// 	} catch (e) {
	// 		const { status } = e as ClientResponseError;

	// 		if (status === 404) redirect(308, '/');
	// 		error(400, 'an error occurred');
	// 	}
	// }
	const [course, categories] = await Promise.all([getCourse(), getCategories()]);

	const titleForm = await superValidate(course, titleSchema);
	const descriptionForm = await superValidate(course, descriptionSchema);
	const categoryForm = await superValidate(course, categorySchema);
	const priceForm = await superValidate(course, priceSchema);
	const chapterTitleForm = await superValidate(chapterTitleSchema, { id: 'chapterTitleForm' });
	return {
		course,
		categories,
		titleForm,
		descriptionForm,
		categoryForm,
		priceForm,
		chapterTitleForm
	};
};

export const actions = {
	updateTitle: async (event) => {
		const {
			locals: { pb },
			params
		} = event;
		const { courseId } = params;

		const form = await superValidate(event, titleSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await pb.collection('courses').update(courseId, form.data);
			return message(form, 'successfully updated course title');
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return message(form, errorMessage, {
				status: 400
			});
		}
	},
	updateDescription: async (event) => {
		const {
			locals: { pb },
			params
		} = event;
		const { courseId } = params;

		const form = await superValidate(event, descriptionSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await pb.collection('courses').update(courseId, form.data);
			return message(form, 'successfully updated course description');
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return message(form, errorMessage, {
				status: 400
			});
		}
	},
	updateImage: async (event) => {
		const {
			locals: { pb },
			params,
			request
		} = event;
		const { courseId } = params;

		const formData = await request.formData();

		const image = formData.get('image');

		if (image instanceof File) {
			try {
				await pb.collection('courses').update(courseId, { imageUrl: image });
				return { message: 'successfully updated course image' };
			} catch (e) {
				const { message: errorMessage } = e as ClientResponseError;

				return fail(400, {
					message: errorMessage
				});
			}
		} else {
			return fail(400, {
				message: 'Invalid file format'
			});
		}
	},
	updateCategory: async (event) => {
		const {
			locals: { pb },
			params
		} = event;
		const { courseId } = params;

		const form = await superValidate(event, categorySchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await pb.collection('courses').update(courseId, form.data);
			return message(form, 'successfully updated course category');
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return message(form, errorMessage, {
				status: 400
			});
		}
	},
	updatePrice: async (event) => {
		const {
			locals: { pb },
			params
		} = event;
		const { courseId } = params;

		const form = await superValidate(event, priceSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await pb.collection('courses').update(courseId, form.data);
			return message(form, 'successfully updated course price');
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return message(form, errorMessage, {
				status: 400
			});
		}
	},
	createAttachment: async (event) => {
		const {
			locals: { pb },
			params,
			request
		} = event;
		const { courseId } = params;

		const formData = await request.formData();

		const file = formData.get('file');

		try {
			await pb.collection('attachments').create({
				name: 'whatever',
				course: courseId,
				url: file
			});
			return { message: 'successfully added course attachment' };
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return fail(400, {
				message: errorMessage
			});
		}
	},
	deleteAttachment: async (event) => {
		const {
			locals: { pb },
			request
		} = event;
		// await new Promise((resolve) => setTimeout(resolve, 2000));

		const formData = await request.formData();

		const id = formData.get('id') as string;

		try {
			await pb.collection('attachments').delete(id);

			return { message: 'successfully deleted course attachment' };
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return fail(400, {
				message: errorMessage
			});
		}
	},
	createChapter: async (event) => {
		const {
			locals: { pb },

			params
		} = event;
		const { courseId } = params;

		const form = await superValidate(event, chapterTitleSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let lastChapter: Chapter | null = null;
		try {
			lastChapter = await pb
				.collection('chapters')
				.getFirstListItem<Chapter>(`course="${courseId}"`, {
					sort: '-position'
				});
		} catch {
			lastChapter = null;
		}

		try {
			const newPosition = lastChapter ? lastChapter.position + 1 : 1;
			await pb.collection('chapters').create({
				title: form.data.title,
				course: courseId,
				position: newPosition
			});
			return message(form, 'successfully added course chapter');
		} catch (e) {
			console.log('🚀 ~ createChapter: ~ e:', e);
			const { message: errorMessage } = e as ClientResponseError;

			return message(form, errorMessage, {
				status: 400
			});
		}
	},
	updatePublish: async (event) => {
		const {
			locals: { pb },
			params
		} = event;
		const { courseId } = params;

		try {
			const course = await pb.collection('courses').getOne<Course>(courseId);
			if (course.isPublished) {
				await pb.collection('courses').update(courseId, {
					isPublished: false
				});

				return { message: 'successfully unpublished course' };
			} else {
				await pb.collection('courses').update(courseId, {
					isPublished: true
				});
				return { message: 'successfully published course', confetti: true };
			}
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return fail(400, {
				message: errorMessage
			});
		}
	},
	deleteCourse: async (event) => {
		const {
			locals: { pb },
			params
		} = event;
		const { courseId } = params;
		try {
			const course = await pb.collection('courses').getOne<Course>(courseId, {
				expand: 'chapters(course).muxData(chapterId)'
			});

			for (const chapter of course.expand?.['chapters(course)'] ?? []) {
				if (chapter.expand?.['muxData(chapterId)']) {
					await Video.Assets.del(chapter.expand['muxData(chapterId)'][0].assetId);
				}
			}
			await pb.collection('courses').delete(courseId);
		} catch (e) {
			const { message: errorMessage, status } = e as ClientResponseError;
			if (status === 404) error(404, 'course does not exist');

			return fail(400, {
				message: errorMessage
			});
		}
		redirect(308, '/teacher/courses');
	}
};
