import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/schema';
import { fail } from '@sveltejs/kit';
export const load = async () => {
	const form = await superValidate(loginSchema);

	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		// Simulate loading state for 5 seconds
		await new Promise((resolve) => setTimeout(resolve, 5000));

		const form = await superValidate(event, loginSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
