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

<div class="container">
	{#if userInfo}
		<div style="width: 10%; text-align: center;">
			<div class="profile">
				<div class="profile-left">
					<img
						src={userInfo?.picture
							? `/api/profile-image?url=${encodeURIComponent(userInfo.picture)}`
							: ''}
						alt="Profile"
						class="profile-image"
					/>
				</div>
				<button onclick={handleLogout} class="button button-logout"> Logout </button>
			</div>

			<button onclick={handleGymEvent} disabled={isLoading} class="button button-gym">
				{isLoading ? 'Adding event...' : 'Log Gym Event'}
			</button>
		</div>
	{:else}
		<div style="text-align: center">
			<div class="loading"></div>
		</div>
	{/if}
</div>
