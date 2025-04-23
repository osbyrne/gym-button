<script lang="ts">
	let {} = $props();
	const REDIRECT_URI = `${window.location.origin}/auth/callback`;
	const SCOPES = [
		'profile',
		'https://www.googleapis.com/auth/calendar',
		'https://www.googleapis.com/auth/calendar.events'
	].join(' ');
</script>

<div class="container">
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
		class="button login-button"
		style="display: flex; align-items: center; gap: 0.5rem; justify-content: center"
	>
		<img src="https://www.google.com/favicon.ico" alt="Google" style="width: 18px; height: 18px" />
		<span>Login with Google</span>
	</button>
</div>
