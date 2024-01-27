// src/hooks.server.js
import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const { url, locals, request } = event;
	locals.pb = new PocketBase('http://127.0.0.1:8090');

	// load the store data from the request cookie string
	locals.pb.authStore.loadFromCookie(request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		locals.pb.authStore.isValid && (await locals.pb.collection('users').authRefresh());
		locals.user = locals.pb.authStore.model;
	} catch (_) {
		// clear the auth store on failed refresh
		locals.pb.authStore.clear();
		locals.user = undefined;
	}

	if (
		url.pathname.startsWith('/') &&
		!locals.user &&
		!['/login', '/register'].includes(url.pathname)
	) {
		console.log(url.pathname);

		redirect(303, '/login');
	}
	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', locals.pb.authStore.exportToCookie());

	return response;
}
