<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { loginSchema } from '$lib/schema';
	import { Loader2 } from 'lucide-svelte';
	export let data;
</script>

<div>
	<h1 class="text-3xl text-center py-10 font-semibold">Welcome to Fat Llama</h1>

	<Form.Root
		method="POST"
		action="/login"
		form={data.form}
		schema={loginSchema}
		let:config
		let:delayed
	>
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="password">
			<Form.Item>
				<Form.Label>Password</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button class="w-full"
			>{#if delayed}
				<Loader2 class="w-6 h-6 animate-spin " />
			{:else}
				Login
			{/if}</Form.Button
		>
		<div class="flex items-center my-4">
			<div class="flex-grow border-t border-gray-300"></div>
			<div class="mx-4 text-gray-500">OR</div>
			<div class="flex-grow border-t border-gray-300"></div>
		</div>
		<Form.Button class="w-full" variant="secondary" href="/register">Register</Form.Button>
	</Form.Root>
</div>
