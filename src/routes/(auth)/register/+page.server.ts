import { message, superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from '$lib/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
export const load = async () => {
	const form = await superValidate(registerSchema);

	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		// Simulate loading state for 5 seconds
		// await new Promise((resolve) => setTimeout(resolve, 5000));
		const {
			locals: { pb }
		} = event;

		const form = await superValidate(event, registerSchema);
		console.log('🚀 ~ default: ~ form:', form);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await pb.collection('users').create(form.data);
		} catch (e) {
			console.log('🚀 ~ default: ~ e:', e);
			const { message: errorMessage } = e as ClientResponseError;
			return message(form, errorMessage, {
				status: 400
			});
		}
		redirect(303, '/login');
	}
};
