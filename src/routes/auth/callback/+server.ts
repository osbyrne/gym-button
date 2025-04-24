import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		throw redirect(303, '/');
	}

	const tokens = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			code,
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
			redirect_uri: `${url.origin}/auth/callback`,
			grant_type: 'authorization_code'
		})
	}).then((res) => res.json());

	const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
		headers: {
			Authorization: `Bearer ${tokens.access_token}`
		}
	}).then((res) => res.json());

	cookies.set('session', tokens.access_token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: true,
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});

	throw redirect(303, '/dashboard');
};
