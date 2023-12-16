<script lang="ts">
	export let title: string;
	export let image: string;
</script>

<a href="/" class="shadow-md rounded-lg overflow-hidden h-[210px] relative">
	<img src="/{image}" class="w-full object-bottom h-full object-cover" alt="" />
	<p class="bg-background w-full absolute bottom-0 left-0 py-[18px] text-center">
		{title}
	</p>
</a>
