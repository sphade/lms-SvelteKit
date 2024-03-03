import { message, superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/schema';
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
export const load = async () => {
	 

	return {
		    form: await superValidate(zod(loginSchema)),
	};
};

export const actions = {
	default: async (event) => {
		const {
			locals: { pb }
		} = event;
		 const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			await pb.collection('users').authWithPassword(form.data.email, form.data.password);
		} catch (e) {
			console.log('🚀 ~ default: ~ e:', e);
			const { status } = e as ClientResponseError;

			return message(form, { status, message: 'an error occurred' });
		}
		redirect(303, '/');
	}
};
