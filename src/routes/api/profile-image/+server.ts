import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const imageCache = new Map<string, { data: Buffer; type: string }>();

export const GET: RequestHandler = async ({ url, fetch }) => {
	const imageUrl = url.searchParams.get('url');

	if (!imageUrl) {
		throw error(400, 'Missing image URL');
	}

	// Check cache first
	if (imageCache.has(imageUrl)) {
		const cached = imageCache.get(imageUrl)!;
		return new Response(cached.data, {
			headers: {
				'Content-Type': cached.type,
				'Cache-Control': 'public, max-age=86400'
			}
		});
	}

	// Fetch and cache
	const response = await fetch(imageUrl);
	const data = Buffer.from(await response.arrayBuffer());
	const type = response.headers.get('content-type') || 'image/jpeg';

	imageCache.set(imageUrl, { data, type });

	return new Response(data, {
		headers: {
			'Content-Type': type,
			'Cache-Control': 'public, max-age=86400'
		}
	});
};
