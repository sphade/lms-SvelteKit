<script lang="ts">
	import { Search } from 'lucide-svelte';
</script>

<div class="flex bg-white gap-2 w-full max-w-2xl items-center shadow px border rounded-full">
	<Search class="ml-6" />
	<input
		placeholder="Bikes , Drones, Cameras"
		type="text"
		class="flex-1 bg-transparent outline-none h-[47px] md:h-[70px]"
		name=""
		id=""
	/>
	<button class="bg-purple-900 text-white rounded-full px-6 h-10 md:h-12 mr-2"> Search </button>
</div>
