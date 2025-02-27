import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
    const session = cookies.get('session');

    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }

    const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${session}`
        }
    }).then(res => res.json());

    return json(userInfo);
}; 