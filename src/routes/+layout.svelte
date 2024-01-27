<script lang="ts">
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
	import 'quill/dist/quill.snow.css';

	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster richColors closeButton />
<div class="h-screen">
	<slot />
</div>
