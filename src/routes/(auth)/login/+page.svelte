<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { loginSchema } from '$lib/schema';
	import { Loader2 } from 'lucide-svelte';
	import { fade, fly, slide } from 'svelte/transition';
	export let data;
</script>

<div>
	<h1 class="py-5 text-center text-2xl font-semibold">Welcome to s-u-c</h1>

	<Form.Root
		method="POST"
		schema={loginSchema}
		action="/login"
		form={data.form}
		let:config
		let:delayed
		let:message
	>
		{#if message}
			<div in:fly={{ y: 20 }} out:slide class="bg-red-500 text-white text-center rounded-md py-3">
				{message?.message}
			</div>
		{/if}
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
				<Form.Input type="password" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button class="w-full"
			>{#if delayed}
				<Loader2 class="h-6 w-6 animate-spin " />
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
	</Form.Root>
</div>
