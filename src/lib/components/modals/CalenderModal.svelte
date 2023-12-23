<script lang="ts">
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import * as Dialog from '$lib/components/ui/dialog';

	import { today, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import type { DateRange } from 'bits-ui';

	import { Calendar } from '$lib/components/ui/calendar';
	import { Button } from '../ui/button';

	const start = today(getLocalTimeZone());
	const end = start.add({ months: 1 });
	let value = {
		start,
		end
	};
	$: {
		console.log('🚀 ~ file: CalenderModal.svelte:15 ~ value:', value);
	}

	// let value: DateValue | undefined;
</script>

<Dialog.Root>
	<Dialog.Trigger>Open</Dialog.Trigger>
	<Dialog.Content class="max-w-2xl">
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
		</Dialog.Header>
		<RangeCalendar numberOfMonths={2} bind:value class="border rounded-md flex-nowrap  " />
		<Dialog.Footer>
			<Button variant="secondary">Clear Dates</Button>
			<Button>Continue</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
