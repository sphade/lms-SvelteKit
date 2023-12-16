<script>
	import Header from '$lib/components/Header.svelte';
	import '@fontsource/noto-sans';
	import '@fontsource/noto-sans/100.css';
	import '@fontsource/noto-sans/200.css';
	import '@fontsource/noto-sans/300.css';
	import '@fontsource/noto-sans/400.css';
	import '@fontsource/noto-sans/500.css';
	import '@fontsource/noto-sans/600.css';
	import '@fontsource/noto-sans/700.css';
	import '@fontsource/noto-sans/800.css';
	import '@fontsource/noto-sans/900.css';
	import '../app.pcss';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />
<slot />
<Footer />
