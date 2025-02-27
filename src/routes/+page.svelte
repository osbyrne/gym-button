<script lang="ts">
	let {} = $props();
	const REDIRECT_URI = 'http://localhost:5173/auth/callback'; // For development
	const SCOPES = [
		'email',
		'profile',
		'https://www.googleapis.com/auth/calendar',
		'https://www.googleapis.com/auth/calendar.events'
	].join(' ');
</script>

<div class="flex h-screen items-center justify-center">
	<button
		onclick={() => {
			window.location.href =
				'https://accounts.google.com/o/oauth2/v2/auth?' +
				new URLSearchParams({
					client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
					redirect_uri: REDIRECT_URI,
					response_type: 'code',
					scope: SCOPES,
					prompt: 'consent'
				}).toString();
		}}
		class="mx-auto block flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 font-bold text-gray-600 before:inline-block before:h-5 before:w-5 before:bg-[url('https://www.google.com/favicon.ico')] before:bg-contain before:content-[''] hover:bg-gray-100"
	>
		Login
	</button>
</div>
