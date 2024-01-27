import { chapterAccessSchema, chapterDescriptionSchema, chapterTitleSchema } from '$lib/schema.js';
import type { Chapter, Course, MuxData } from '$lib/types';
import { error, fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import { message, superValidate } from 'sveltekit-superforms/server';
import Mux from '@mux/mux-node';
import { MUX_TOKEN_ID, MUX_TOKEN_SECRET } from '$env/static/private';
const { Video } = new Mux(MUX_TOKEN_ID, MUX_TOKEN_SECRET);

export const load = async ({ params, locals: { pb } }) => {
	const chapterId = params.chapterId;
	async function getChapter() {
		try {
			const chapter = await pb.collection('chapters').getOne<Chapter>(chapterId, {
				expand: 'muxData(chapterId)'
			});
			if (chapter.videoUrl) {
				const videoUrl = pb.files.getUrl(chapter, chapter.videoUrl);
				chapter.videoUrl = videoUrl;
			}
			return chapter;
		} catch (e) {
			const { status } = e as ClientResponseError;

			if (status === 404) error(404, 'course does not exist');
			redirect(308, '/');
		}
	}
	const chapter = await getChapter();
	const chapterTitleForm = await superValidate(chapter, chapterTitleSchema);
	const chapterDescriptionForm = await superValidate(chapter, chapterDescriptionSchema);
	const chapterAccessForm = await superValidate(chapter, chapterAccessSchema);

	return {
		chapter,
		chapterTitleForm,
		chapterDescriptionForm,
		chapterAccessForm
	};
};

export const actions = {
	updateTitle: async (event) => {
		const {
			locals: { pb },
			params
		} = event;
		const { chapterId } = params;

		const form = await superValidate(event, chapterTitleSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await pb.collection('chapters').update(chapterId, form.data);
			return message(form, 'successfully updated chapter title');
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
		const { chapterId } = params;

		const form = await superValidate(event, chapterDescriptionSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			await pb.collection('chapters').update(chapterId, form.data);
			return message(form, 'successfully updated chapter description');
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return message(form, errorMessage, {
				status: 400
			});
		}
	},
	updateAccess: async (event) => {
		const {
			locals: { pb },
			params
		} = event;
		const { chapterId } = params;

		const form = await superValidate(event, chapterAccessSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			await pb.collection('chapters').update(chapterId, form.data);
			return message(form, 'successfully updated chapter access settings');
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return message(form, errorMessage, {
				status: 400
			});
		}
	},
	updateVideo: async (event) => {
		const {
			locals: { pb },
			params,
			request
		} = event;
		const { chapterId } = params;
		const formData = await request.formData();

		const video = formData.get('video');
		let existingMuxData: MuxData | null;
		try {
			existingMuxData = await pb
				.collection('muxData')
				.getFirstListItem<MuxData>(`chapterId = "${chapterId}"`);
		} catch {
			existingMuxData = null;
		}

		try {
			const chapter = await pb
				.collection('chapters')
				.update<Chapter>(chapterId, { videoUrl: video });
			const videoUrl = pb.files.getUrl(chapter, chapter.videoUrl);

			if (existingMuxData) {
				await Video.Assets.del(existingMuxData.assetId);
				await pb.collection('muxData').delete(existingMuxData.id);
			}
			const asset = await Video.Assets.create({
				input: videoUrl,
				playback_policy: 'public',
				test: false
			});
			await pb.collection('muxData').create({
				chapterId,
				assetId: asset.id,
				playbackId: asset.playback_ids?.[0]?.id
			});
			return { message: 'successfully updated chapter video' };
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return fail(400, {
				message: errorMessage
			});
		}
	},
	deleteChapter: async (event) => {
		const {
			locals: { pb },
			params
		} = event;
		const { chapterId, courseId } = params;
		let existingMuxData: MuxData | null;
		try {
			existingMuxData = await pb
				.collection('muxData')
				.getFirstListItem<MuxData>(`chapterId = "${chapterId}"`);
		} catch {
			existingMuxData = null;
		}
		try {
			if (existingMuxData) {
				await Video.Assets.del(existingMuxData.assetId);
				await pb.collection('muxData').delete(existingMuxData.id);
			}
			await pb.collection('chapters').delete(chapterId);
			const isPublishedChapterInCourse = await pb.collection('chapters').getFullList({
				filter: `course = "${courseId}" && isPublished = "${true}" `
			});

			if (!isPublishedChapterInCourse.length) {
				await pb.collection('courses').update<Course>(courseId, {
					isPublished: false
				});
			}
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return fail(400, {
				message: errorMessage
			});
		}
		redirect(308, `/teacher/courses/${courseId}`);
	},
	updatePublish: async (event) => {
		const {
			locals: { pb },
			params
		} = event;
		const { chapterId, courseId } = params;
		try {
			const chapter = await pb.collection('chapters').getOne<Chapter>(chapterId);
			if (chapter.isPublished) {
				await pb.collection('chapters').update(chapterId, {
					isPublished: false
				});
				const isPublishedChapterInCourse = await pb.collection('chapters').getFullList({
					filter: `course = "${courseId}" && isPublished = "${true}" `
				});

				if (!isPublishedChapterInCourse.length) {
					await pb.collection('courses').update<Course>(courseId, {
						isPublished: false
					});
				}
				return { message: 'successfully unpublished chapter' };
			} else {
				await pb.collection('chapters').update(chapterId, {
					isPublished: true
				});
				return { message: 'successfully published chapter' };
			}
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return fail(400, {
				message: errorMessage
			});
		}
	}
};
