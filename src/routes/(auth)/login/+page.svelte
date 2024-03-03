<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { loginSchema } from '$lib/schema';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	export let data;
	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance, delayed } = form;
</script>

<div>
	<h1 class="py-5 text-center text-2xl font-semibold">Welcome to s-u-c</h1>
	<form method="POST" action="/login" use:enhance>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input {...attrs} bind:value={$formData.email} />
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input {...attrs} type="password" bind:value={$formData.password} />
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>
		<Form.Button class="w-full"
			>{#if $delayed}
				<Loader2 class="size-6 animate-spin " />
			{:else}
				Login
			{/if}</Form.Button
		>
		<div class="my-4 flex items-center">
			<div class="flex-grow border-t border-gray-300"></div>
			<div class="mx-4 text-gray-500">OR</div>
			<div class="flex-grow border-t border-gray-300"></div>
		</div>
		<Form.Button class="w-full" variant="secondary" href="/register">Register</Form.Button>
	</form>
</div>
