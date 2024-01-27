import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { user } }) => {
	console.log('🚀 ~ file: +layout.server.ts:4 ~ load ~ user:', user);
	// if (!user) redirect(308, '/login');
};
