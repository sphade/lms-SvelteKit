<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { registerSchema } from '$lib/schema';
	// import  Loader2  from 'lucide-svelte/icons/loader-2';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import Loader2 from 'lucide-svelte/icons/loader-2';

	export let data;
	const form = superForm(data.form, {
		validators: zodClient(registerSchema),
		onUpdated({ form }) {
			if (form.message) {
				if (!form.valid) {
					toast.error(form.message);
				}
				if (form.valid) {
					toast.success(form.message);
				}
			}
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<h1 class="py-5 text-center text-2xl font-semibold">Sign Up</h1>
<form method="POST" action="/register" use:enhance>
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

	<Form.Field {form} name="passwordConfirm">
		<Form.Control let:attrs>
			<Form.Label>Confirm password</Form.Label>
			<Input {...attrs} type="password" bind:value={$formData.passwordConfirm} />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<div class="grid grid-cols-2 gap-5">
		<Form.Field {form} name="firstName">
			<Form.Control let:attrs>
				<Form.Label>First Name</Form.Label>
				<Input {...attrs} bind:value={$formData.firstName} />
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="lastName">
			<Form.Control let:attrs>
				<Form.Label>Last Name</Form.Label>
				<Input {...attrs} bind:value={$formData.lastName} />
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>
	</div>
	<Form.Button class="w-full"
		>{#if $delayed}
			<Loader2 class="size-6 animate-spin " />
		{:else}
			Register
		{/if}</Form.Button
	>
	<div class="my-4 flex items-center">
		<div class="flex-grow border-t border-gray-300"></div>
		<div class="mx-4 text-gray-500">OR</div>
		<div class="flex-grow border-t border-gray-300"></div>
	</div>
	<Form.Button class="w-full" variant="secondary" href="/login">login</Form.Button>
</form>
