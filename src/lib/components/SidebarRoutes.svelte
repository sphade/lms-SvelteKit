<script lang="ts">
	import { BarChart, Compass, Layout, List } from 'lucide-svelte';
	import SidebarItem from './SidebarItem.svelte';
	import { page } from '$app/stores';

	const guestRoutes = [
		{
			icon: Layout,
			label: 'Dashboard',
			href: '/'
		},
		{
			icon: Compass,
			label: 'Browse',
			href: '/search'
		}
	];
	const teacherRoute = [
		{
			icon: List,
			label: 'Courses',
			href: '/teacher/courses'
		},
		{
			icon: BarChart,
			label: 'Analytics',
			href: '/teacher/analytics'
		}
	];
	$: pathname = $page.url.pathname;
	$: isTeacherPage = pathname?.startsWith('/teacher');

	$: route = isTeacherPage ? teacherRoute : guestRoutes;
</script>

<div class="flex flex-col w-full">
	{#each route as { href, icon, label }}
		<SidebarItem {href} {icon} {label} />
	{/each}
</div>
