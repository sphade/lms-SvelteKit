<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { registerSchema } from '$lib/schema';
	import { Loader2 } from 'lucide-svelte';
	export let data;
	import { toast } from 'svelte-sonner';
</script>

<h1 class="py-5 text-center text-2xl font-semibold">Sign Up</h1>
<Form.Root
	method="POST"
	action="/register"
	form={data.form}
	schema={registerSchema}
	let:config
	let:delayed
	options={{
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
	}}
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
			<Form.Input type="password" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="passwordConfirm">
		<Form.Item>
			<Form.Label>Confirm password</Form.Label>
			<Form.Input type="password" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<div class="grid grid-cols-2 gap-5">
		<Form.Field {config} name="firstName">
			<Form.Item>
				<Form.Label>First name</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="lastName">
			<Form.Item>
				<Form.Label>Last name</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
	</div>
	<Form.Button class="w-full"
		>{#if delayed}
			<Loader2 class="h-6 w-6 animate-spin " />
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
</Form.Root>
