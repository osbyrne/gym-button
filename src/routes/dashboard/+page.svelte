<script lang="ts">
	import { onMount } from 'svelte';
	let userInfo: any = null;
	let isLoading = false;

	onMount(async () => {
		const response = await fetch('/api/me');
		if (response.ok) {
			userInfo = await response.json();
		}
	});

	async function handleLogout() {
		await fetch('/auth/logout', { method: 'POST' });
		window.location.href = '/';
	}

	async function handleGymEvent() {
		isLoading = true;
		try {
			const response = await fetch('/api/calendar', { method: 'POST' });
			if (response.ok) {
				alert('Gym event added to calendar!');
			} else {
				alert('Failed to add event');
			}
		} catch (error) {
			alert('Error adding event');
		}
		isLoading = false;
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h1 class="mb-4 text-center text-2xl font-bold">Dashboard</h1>

		{#if userInfo}
			<div class="rounded bg-gray-50 p-4 shadow">
				<div class="flex items-center gap-3">
					<img src={userInfo.picture} alt="Profile" class="h-10 w-10 rounded-full" />
					<p>Welcome, {userInfo.email}</p>
				</div>
			</div>

			<button
				onclick={handleGymEvent}
				disabled={isLoading}
				class="mt-6 mb-4 w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
			>
				{isLoading ? 'Adding event...' : 'Log Gym Event'}
			</button>

			<button
				onclick={handleLogout}
				class="w-full rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
			>
				Logout
			</button>
		{:else}
			<div class="text-center">
				<p>Loading...</p>
			</div>
		{/if}
	</div>
</div>
