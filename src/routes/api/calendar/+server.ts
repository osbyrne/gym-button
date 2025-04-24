import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, fetch }) => {
	const session = cookies.get('session');

	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}

	// First, try to find the "gym" calendar
	const calendars = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
		headers: {
			Authorization: `Bearer ${session}`
		}
	}).then((res) => res.json());

	let gymCalendarId = calendars.items?.find((cal: any) => cal.summary === 'gym')?.id;

	// If gym calendar doesn't exist, create it
	if (!gymCalendarId) {
		const newCalendar = await fetch('https://www.googleapis.com/calendar/v3/calendars', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				summary: 'gym'
			})
		}).then((res) => res.json());

		gymCalendarId = newCalendar.id;
	}

	// Create the gym event
	const now = new Date();
	const endTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later

	const event = await fetch(
		`https://www.googleapis.com/calendar/v3/calendars/${gymCalendarId}/events`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				summary: 'gym',
				start: {
					dateTime: now.toISOString()
				},
				end: {
					dateTime: endTime.toISOString()
				}
			})
		}
	).then((res) => res.json());

	return json(event);
};
