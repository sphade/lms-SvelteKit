<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import CalenderModal from '$lib/components/modals/CalenderModal.svelte';
</script>

<CalenderModal />
<div class="flex md:gap-5 md:mt-8">
	<div class="flex-1 w-screen">
		<div>
			<img
				src="/cameras.png"
				class="  h-[400px] md:h-[480px] w-full object-cover bg-gray-100 md:rounded-2xl"
				alt=""
			/>
			<div class="flex gap-2 md:gap-5 mt-2 md:mt-5">
				<img
					src="/cameras.png"
					class="  h-[100px] w-[130px] object-cover bg-gray-100 rounded-md"
					alt=""
				/>

				<img
					src="/cameras.png"
					class="  h-[100px] w-[130px] object-cover bg-gray-100 rounded-md"
					alt=""
				/>
				<img
					src="/cameras.png"
					class="  h-[100px] w-[130px] object-cover bg-gray-100 rounded-md"
					alt=""
				/>
				<img
					src="/cameras.png"
					class="  h-[100px] w-[130px] object-cover bg-gray-100 rounded-md"
					alt=""
				/>
			</div>
		</div>
		<div class="px-4 mt-5 space-y-10">
			<div>
				<h1 class="text-3xl my-5 font-medium">Numark N4 DJ Controller</h1>
				<div class="flex items-center w-full gap-3">
					<div
						class="bg-white w-full border rounded-sm flex items-center justify-center flex-col gap-2 py-5"
					>
						<p class="text-sm text-muted-foreground capitalize">Daily</p>
						<p class="text-[#030d54] font-medium">
							$10.00<span class="text-muted-foreground font-normal">/day</span>
						</p>
					</div>
					<div
						class="bg-white w-full border rounded-sm flex items-center justify-center flex-col gap-2 py-5"
					>
						<p class="text-sm text-muted-foreground capitalize">Daily</p>
						<p class="text-[#030d54] font-medium">
							$10.00<span class="text-muted-foreground font-normal">/day</span>
						</p>
					</div>
				</div>
			</div>
			<div class="">
				<h2 class=" text-xl md:text-2xl font-medium">Description</h2>
				<p class="font-light leading-tight mt-5">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, magnam ipsum rem dolor
					odit blanditiis labore animi, enim illo architecto beatae consequuntur quibusdam
					perspiciatis. Nulla nesciunt repellendus dolores magni animi!
				</p>
			</div>

			<div class="">
				<h2 class=" text-xl md:text-2xl font-medium">Item owned by Chris</h2>
				<div class="flex items-center gap-5 mt-5">
					<Avatar.Root class="w-20 h-20">
						<Avatar.Image sizes="" src="https://github.com/sphade.png" alt="@sphade" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<Button variant="secondary" class=" capitalize  max-w-sm w-full  font-semibold "
						>message Chris</Button
					>
					<Button variant="secondary" class=" capitalize  max-w-sm w-full  font-semibold "
						>see Chris's profile
					</Button>
				</div>
			</div>
			<div class=" w-full">
				<h2 class="text-xl md:text-2xl font-medium">Other items from Chris</h2>
				<div class="flex flex-wrap items-center gap-2">
					{#each { length: 4 } as _}
						<div class="max-w-[150px] mt-5">
							<img src="/scooter.png" class=" w-full object-cover rounded-2xl h-[110px]" alt="" />
							<p class="truncate capitalize">
								repellendus dolores magni animi! dolores magni animi!
							</p>
							<p class="text-[#25ac9f] font-medium text-sm">$40/day</p>
						</div>
					{/each}
				</div>
				<Button variant="secondary" class=" capitalize  max-w-sm w-full mt-2  font-semibold "
					>all listings from chris
				</Button>
			</div>
		</div>
	</div>
	<div class="w-[480px] hidden h-fit bg-white md:flex flex-col sticky top-[117px] right-0">
		<h1 class="text-3xl font-medium mb-8">Numark N4 DJ Controller</h1>
		<div class="bg-[#f9f8fe] rounded-2xl space-y-10 py-6 px-5">
			<h3 class="text-lg capitalize font-medium">art'n studio in London</h3>

			<div class="flex items-center w-full gap-3">
				<div
					class="bg-white w-full border rounded-sm flex items-center justify-center flex-col gap-2 py-5"
				>
					<p class="text-sm text-muted-foreground capitalize">Daily</p>
					<p class="text-[#030d54] font-medium">
						$10.00<span class="text-muted-foreground font-normal">/day</span>
					</p>
				</div>
			</div>

			<Button class="w-full">Check price and availability</Button>
		</div>
	</div>
</div>
