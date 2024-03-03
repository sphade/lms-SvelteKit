import { titleSchema } from '$lib/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError, RecordModel } from 'pocketbase';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';

export const load = async () => {
	const form = await superValidate(zod(titleSchema));

	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const {
			locals: { pb, user }
		} = event;
		// Simulate loading state for 5 seconds
		// await new Promise((resolve) => setTimeout(resolve, 5000));

		const form = await superValidate(event, zod(titleSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		let courseRecord: RecordModel;
		try {
			courseRecord = await pb.collection('courses').create({ ...form.data, user: user?.id });
			// return message(form, 'successfully created course');
		} catch (e) {
			const { message: errorMessage } = e as ClientResponseError;

			return message(form, errorMessage, {
				status: 400
			});
		}
		redirect(303, `/teacher/courses/${courseRecord.id}`);
	}
};
